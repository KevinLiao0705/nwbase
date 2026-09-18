param(
    [string]$OutputPath = "target\nwbase.jar"
)

$ErrorActionPreference = "Stop"

$repo = Split-Path $PSScriptRoot -Parent
$target = Join-Path $repo "target"
$classes = Join-Path $target "classes"
$output = if ([System.IO.Path]::IsPathRooted($OutputPath)) { $OutputPath } else { Join-Path $repo $OutputPath }
$outputDirectory = Split-Path $output -Parent
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
$sqliteJar = Join-Path $repo ".libs\sqlite-jdbc-3.34.0.jar"

Remove-Item $classes -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item $output -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $classes -Force | Out-Null

& javac --release 11 -g -encoding UTF-8 -d $classes -cp $sqliteJar (Join-Path $repo "src\main\java\server.java")
if ($LASTEXITCODE -ne 0) {
    throw "Java compilation failed with exit code $LASTEXITCODE"
}

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$fileStream = [System.IO.File]::Open($output, [System.IO.FileMode]::CreateNew)
$archive = New-Object System.IO.Compression.ZipArchive(
    $fileStream,
    [System.IO.Compression.ZipArchiveMode]::Create,
    $false
)

function Add-FileToJar {
    param(
        [System.IO.Compression.ZipArchive]$Archive,
        [string]$FilePath,
        [string]$EntryName
    )

    $normalizedName = $EntryName.Replace("\", "/")
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
        $Archive,
        $FilePath,
        $normalizedName,
        [System.IO.Compression.CompressionLevel]::Optimal
    ) | Out-Null
}

try {
    $manifestEntry = $archive.CreateEntry("META-INF/MANIFEST.MF")
    $manifestStream = $manifestEntry.Open()
    try {
        $writer = New-Object System.IO.StreamWriter(
            $manifestStream,
            (New-Object System.Text.UTF8Encoding($false))
        )
        try {
            $writer.Write("Manifest-Version: 1.0`r`nMain-Class: server`r`n`r`n")
        } finally {
            $writer.Dispose()
        }
    } finally {
        $manifestStream.Dispose()
    }

    Get-ChildItem $classes -File -Recurse | ForEach-Object {
        $entryName = $_.FullName.Substring($classes.Length + 1)
        Add-FileToJar $archive $_.FullName $entryName
    }

    $dependency = [System.IO.Compression.ZipFile]::OpenRead($sqliteJar)
    try {
        foreach ($entry in $dependency.Entries) {
            if ([string]::IsNullOrEmpty($entry.Name)) { continue }
            if ($entry.FullName -eq "META-INF/MANIFEST.MF") { continue }
            if ($entry.FullName -match "(?i)^META-INF/.+\.(SF|RSA|DSA)$") { continue }

            $targetEntry = $archive.CreateEntry(
                $entry.FullName,
                [System.IO.Compression.CompressionLevel]::Optimal
            )
            $inputStream = $entry.Open()
            $outputStream = $targetEntry.Open()
            try {
                $inputStream.CopyTo($outputStream)
            } finally {
                $outputStream.Dispose()
                $inputStream.Dispose()
            }
        }
    } finally {
        $dependency.Dispose()
    }

    $webRoot = Join-Path $repo "src\main\webapp"
    Get-ChildItem $webRoot -File -Recurse | ForEach-Object {
        $relativePath = $_.FullName.Substring($webRoot.Length + 1)
        Add-FileToJar $archive $_.FullName ("app-resources/src/main/webapp/" + $relativePath)
    }

    Add-FileToJar $archive (Join-Path $repo "src\setdata.xml") "app-resources/src/setdata.xml"
    $propertiesFile = Join-Path $repo "src\webServeletBase.properties"
    if (Test-Path -LiteralPath $propertiesFile -PathType Leaf) {
        Add-FileToJar $archive $propertiesFile "app-resources/src/webServeletBase.properties"
    }
} finally {
    $archive.Dispose()
    $fileStream.Dispose()
}

$requiredEntries = @(
    "META-INF/MANIFEST.MF",
    "server.class",
    "org/sqlite/JDBC.class",
    "app-resources/src/main/webapp/root.html",
    "app-resources/src/setdata.xml"
)

$verificationArchive = [System.IO.Compression.ZipFile]::OpenRead($output)
try {
    $entryNames = @($verificationArchive.Entries | ForEach-Object FullName)
    foreach ($entryName in $requiredEntries) {
        if ($entryNames -notcontains $entryName) {
            throw "Missing JAR entry: $entryName"
        }
    }
} finally {
    $verificationArchive.Dispose()
}

$jar = Get-Item $output
$hash = (Get-FileHash $output -Algorithm SHA256).Hash
Write-Host "Package complete: $($jar.FullName)"
Write-Host "Size: $($jar.Length) bytes"
Write-Host "SHA-256: $hash"



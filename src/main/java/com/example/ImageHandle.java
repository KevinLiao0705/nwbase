package com.example;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferInt;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;

public class ImageHandle {

    ImageHandle cla;

    ImageHandle() {

    }

    public static BufferedImage resize(BufferedImage img, int newW, int newH) {
        Image tmp = img.getScaledInstance(newW, newH, Image.SCALE_SMOOTH);
        BufferedImage dimg = new BufferedImage(newW, newH, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2d = dimg.createGraphics();
        g2d.drawImage(tmp, 0, 0, null);
        g2d.dispose();
        return dimg;
    }

    public static BufferedImage createImage(int[] pixelData, int width, int height) {
        BufferedImage outputImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        int[] outputImagePixelData = ((DataBufferInt) outputImage.getRaster().getDataBuffer()).getData();
        int len = pixelData.length;
        for (int i = 0; i < len; i++) {
            outputImagePixelData[i] = pixelData[i];
        }
        return outputImage;
    }
    
    public static boolean createBmpFile(int[] pixelData, int width, int height,String fileName){
        try {
            
            //BufferedImage bi = new BufferedImage(100, 100, BufferedImage.TYPE_INT_ARGB);
            BufferedImage image=createImage(pixelData, width, height);
            ImageIO.write(image, "png",  new File(fileName));            
            
           // ImageIO.write(image, "bmp", new File(fileName));
            return true;
        } catch (IOException ex) {
            Logger.getLogger(ImageHandle.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }
    /*
    return buffer index
    id => adr:0~1,0xAB12,HL 
    size => adr:2~5,HL
    width => adr:6~7,HL
    height=> adr:8~9,HL
    rgb adr 10~11 HL, bit(r:5:g:6:b:5)  
    ...
    ...
     */
    public int transBmpToBytes(String inFileName, int width, int height, byte[] byteBuf, int bufSt) {
        /*
        ImageBMP imageFile = ImageBMP.readFromFileAtPath(inFileName);
        if(imageFile==null)
            return 0;
        BufferedImage imgbuf = imageFile.convertToSystemImage();
         */
        File input = new File(inFileName);

        BufferedImage imgbuf;
        try {
            //Read the file to a BufferedImage
            imgbuf = ImageIO.read(input);
        } catch (IOException ex) {
            return 0;

        }

        byte[] btsChk=new byte[]{(byte)0xab,(byte)0xcd,(byte)0x12,(byte)0x34};
        
        byte bt0=0;
        byte bt1=0;
        int w = imgbuf.getWidth();
        int h = imgbuf.getHeight();
        int resize = 1;
        if (w == width && h == height) {
            resize = 0;
        }
        if (resize == 1) {
            imgbuf = ImageHandle.resize(imgbuf, width, height);
        }
        w = width;
        h = height;
        int size = w * h * 2 + 16;
        int inx = bufSt;
        byteBuf[inx++] = (byte) (0xAB);
        byteBuf[inx++] = (byte) (0xCD);
        byteBuf[inx++] = (byte) (16);//16bit
        byteBuf[inx++] = (byte) (0);//0:rgb:1:bgr                                
        byteBuf[inx++] = (byte) ((size) & 255);
        byteBuf[inx++] = (byte) ((size >> 8) & 255);
        byteBuf[inx++] = (byte) ((size >> 16) & 255);
        byteBuf[inx++] = (byte) ((size >> 24) & 255);
        byteBuf[inx++] = (byte) ((w) & 255);
        byteBuf[inx++] = (byte) ((w >> 8) & 255);
        byteBuf[inx++] = (byte) ((h) & 255);
        byteBuf[inx++] = (byte) ((h >> 8) & 255);
        int chkInx=inx;
        byteBuf[inx++] = (byte) (0);
        byteBuf[inx++] = (byte) (0);
        byteBuf[inx++] = (byte) (0);
        byteBuf[inx++] = (byte) (0);
        for (int i = 0; i < h; i++) {
            for (int j = 0; j < w; j++) {
                int word = 0;
                //int rgb = imgbuf.getRGB(w-j-1, i);
                int rgb = imgbuf.getRGB(j, i);
                int ri = (rgb >> 19) & 0x1f;
                int gi = (rgb >> 10) & 0x3f;
                int bi = (rgb >> 3) & 0x1f;
                
                word += bi << 13;
                word += gi << 5;
                word += ri;
                        
                        
                
                bt1=(byte) ((word >> 8) & 255);
                bt0=(byte) ((word) & 255);
                btsChk[0]=(byte)(bt0 ^ btsChk[0]^i);
                btsChk[1]=(byte)(bt1 ^ btsChk[1]^j);
                btsChk[2]=(byte)(bt0 + btsChk[2]+i);
                btsChk[3]=(byte)(bt1 + btsChk[3]+j);
                byteBuf[inx++] = bt0;
                byteBuf[inx++] = bt1;
            }
        }
        btsChk[0]=(byte)(bt0 ^ btsChk[0]);
        btsChk[1]=(byte)(bt1 ^ btsChk[1]);
        btsChk[2]=(byte)(bt0 + btsChk[2]);
        btsChk[3]=(byte)(bt1 + btsChk[3]);
        
        
        byteBuf[chkInx++]=btsChk[0];
        byteBuf[chkInx++]=btsChk[1];
        byteBuf[chkInx++]=btsChk[2];
        byteBuf[chkInx++]=btsChk[3];
        return size;
    }

}

class ByteOrder {

    public static void reverse(byte[] bytesToConvert) {
        int numberOfBytes = bytesToConvert.length;
        int numberOfBytesHalf = numberOfBytes / 2;

        for (int b = 0; b < numberOfBytesHalf; b++) {
            byte byteFromStart = bytesToConvert[b];
            bytesToConvert[b] = bytesToConvert[numberOfBytes - 1 - b];
            bytesToConvert[numberOfBytes - 1 - b] = byteFromStart;
        }
    }

    public static int reverse(int intToReverse) {
        byte[] intAsBytes = new byte[]{
            (byte) (intToReverse & 0xFF),
            (byte) ((intToReverse >> 8) & 0xFF),
            (byte) ((intToReverse >> 16) & 0xFF),
            (byte) ((intToReverse >> 24) & 0xFF),};

        intToReverse
                = ((intAsBytes[3] & 0xFF)
                + ((intAsBytes[2] & 0xFF) << 8)
                + ((intAsBytes[1] & 0xFF) << 16)
                + ((intAsBytes[0] & 0xFF) << 24));

        return intToReverse;
    }

    public static long reverse(long valueToReverse) {
        byte[] valueAsBytes = new byte[]{
            (byte) (valueToReverse & 0xFF),
            (byte) ((valueToReverse >> 8) & 0xFF),
            (byte) ((valueToReverse >> 16) & 0xFF),
            (byte) ((valueToReverse >> 24) & 0xFF),
            (byte) ((valueToReverse >> 32) & 0xFF),
            (byte) ((valueToReverse >> 40) & 0xFF),
            (byte) ((valueToReverse >> 48) & 0xFF),
            (byte) ((valueToReverse >> 56) & 0xFF),};

        long returnValue = (valueAsBytes[7] & 0xFF);
        returnValue += ((valueAsBytes[6] & 0xFF) << 8);
        returnValue += ((valueAsBytes[5] & 0xFF) << 16);
        returnValue += ((valueAsBytes[4] & 0xFF) << 24);
        returnValue += ((valueAsBytes[3] & 0xFF) << 32);
        returnValue += ((valueAsBytes[2] & 0xFF) << 40);
        returnValue += ((valueAsBytes[1] & 0xFF) << 48);
        returnValue += ((valueAsBytes[0] & 0xFF) << 56);

        return returnValue;
    }

    public static short reverse(short valueToReverse) {
        byte[] valueAsBytes = new byte[]{
            (byte) (valueToReverse & 0xFF),
            (byte) ((valueToReverse >> 8) & 0xFF),};

        valueToReverse = (short) (((valueAsBytes[1] & 0xFF))
                + ((valueAsBytes[0] & 0xFF) << 8));

        return valueToReverse;
    }
}

class Coords {

    public int x;
    public int y;

    public Coords(int x, int y) {
        this.x = x;
        this.y = y;
    }
}

class DataInputStreamLittleEndian {

    private DataInputStream systemStream;

    public DataInputStreamLittleEndian(DataInputStream systemStream) {
        this.systemStream = systemStream;
    }

    public void close() throws IOException {
        this.systemStream.close();
    }

    public void read(byte[] bytesToReadInto) throws IOException {
        this.systemStream.read(bytesToReadInto);

        // not necessary?
        //ByteOrder.reverse(bytesToReadInto);
    }

    public int readInt() throws IOException {
        return ByteOrder.reverse(this.systemStream.readInt());
    }

    public long readLong() throws IOException {
        return ByteOrder.reverse(this.systemStream.readLong());
    }

    public short readShort() throws IOException {
        return ByteOrder.reverse(this.systemStream.readShort());
    }

    public String readString(int numberOfCharacters) throws IOException {
        byte[] bytesRead = new byte[numberOfCharacters];

        this.systemStream.read(bytesRead);

        return new String(bytesRead);
    }
}

class DataOutputStreamLittleEndian {

    private DataOutputStream systemStream;

    public DataOutputStreamLittleEndian(DataOutputStream systemStream) {
        this.systemStream = systemStream;
    }

    public void close() throws IOException {
        this.systemStream.close();
    }

    public void write(byte[] bytesToWriteFrom) throws IOException {
        this.systemStream.write(bytesToWriteFrom);
    }

    public void writeInt(int valueToWrite) throws IOException {
        this.systemStream.writeInt(ByteOrder.reverse(valueToWrite));
    }

    public void writeLong(long valueToWrite) throws IOException {
        this.systemStream.writeLong(ByteOrder.reverse(valueToWrite));
    }

    public void writeShort(short valueToWrite) throws IOException {
        this.systemStream.writeShort(ByteOrder.reverse(valueToWrite));
    }

    public void writeString(String stringToWrite) throws IOException {
        this.systemStream.writeBytes(stringToWrite);
    }
}

class ImageBMP {

    public String filePath;
    public FileHeader fileHeader;
    public DIBHeader dibHeader;
    public int[] colorTable;
    public byte[] pixelData;

    public ImageBMP(
            String filePath,
            FileHeader fileHeader,
            DIBHeader dibHeader,
            int[] colorTable,
            byte[] pixelData
    ) {
        this.filePath = filePath;
        this.fileHeader = fileHeader;
        this.dibHeader = dibHeader;
        this.colorTable = colorTable;
        this.pixelData = pixelData;
    }

    public BufferedImage convertToSystemImage() {
        // hack
        // We're assuming things about the color model in this method
        // that may not necessarily be true in all .BMP files.

        Coords imageSizeInPixels = this.dibHeader.imageSizeInPixels();

        java.awt.image.BufferedImage returnValue;

        returnValue = new java.awt.image.BufferedImage(
                imageSizeInPixels.x,
                imageSizeInPixels.y,
                java.awt.image.BufferedImage.TYPE_INT_ARGB
        );

        int bitsPerPixel = this.dibHeader.bitsPerPixel();
        int bytesPerPixel = bitsPerPixel / 8;
        int colorOpaqueBlackAsArgb = 0xFF << bytesPerPixel * 8;

        for (int y = 0; y < imageSizeInPixels.y; y++) {
            for (int x = 0; x < imageSizeInPixels.x; x++) {
                int bitOffsetForPixel
                        = ((imageSizeInPixels.y - y - 1) // invert y
                        * imageSizeInPixels.x
                        + x)
                        * bitsPerPixel;

                int byteOffsetForPixel = bitOffsetForPixel / 8;

                int pixelColorArgb = colorOpaqueBlackAsArgb;
                for (int b = 0; b < bytesPerPixel; b++) {
                    pixelColorArgb += (this.pixelData[byteOffsetForPixel + b] & 0xFF) << (8 * b);
                }

                returnValue.setRGB(
                        x,
                        y,
                        pixelColorArgb
                );
            }
        }

        return returnValue;
    }

    public static ImageBMP readFromFileAtPath(String filePathToReadFrom) {
        ImageBMP returnValue = null;

        try {
            DataInputStreamLittleEndian reader = new DataInputStreamLittleEndian(
                    new DataInputStream(
                            new FileInputStream(filePathToReadFrom)
                    )
            );

            FileHeader fileHeader = FileHeader.readFromStream(
                    reader
            );

            DIBHeader dibHeader = DIBHeader.buildFromStream(reader);

            int[] colorTable = dibHeader.readColorTable(reader);

            int numberOfBytesInPixelData = dibHeader.imageSizeInBytes();

            byte[] pixelData = new byte[numberOfBytesInPixelData];

            reader.read(pixelData);

            returnValue = new ImageBMP(
                    filePathToReadFrom,
                    fileHeader,
                    dibHeader,
                    colorTable,
                    pixelData
            );

            reader.close();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }

        return returnValue;
    }

    public void writeToFileAtPath(String fileName) {
        try {
            DataOutputStreamLittleEndian writer = new DataOutputStreamLittleEndian(
                    new DataOutputStream(
                            new FileOutputStream(fileName)
                    )
            );

            this.fileHeader.writeToStream(writer);

            this.dibHeader.writeToStream(writer);

            writer.write(this.pixelData);

            writer.close();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }

    // inner classes 
    public static class FileHeader {
        // 14 bytes

        public String signature;
        public int fileSize;
        public short reserved1;
        public short reserved2;
        public int fileOffsetToPixelArray;

        public FileHeader(
                String signature,
                int fileSize,
                short reserved1,
                short reserved2,
                int fileOffsetToPixelArray
        ) {
            this.signature = signature;
            this.fileSize = fileSize;
            this.reserved1 = reserved1;
            this.reserved2 = reserved2;
            this.fileOffsetToPixelArray = fileOffsetToPixelArray;
        }

        public static FileHeader readFromStream(DataInputStreamLittleEndian reader) {
            FileHeader returnValue = null;

            try {
                returnValue = new FileHeader(
                        reader.readString(2), // signature
                        reader.readInt(), // fileSize,
                        reader.readShort(), // reserved1
                        reader.readShort(), // reserved2
                        reader.readInt() // fileOffsetToPixelArray
                );
            } catch (IOException ex) {
                ex.printStackTrace();
            }

            return returnValue;
        }

        public void writeToStream(DataOutputStreamLittleEndian writer) {
            try {
                writer.writeString(this.signature);
                writer.writeInt(this.fileSize);
                writer.writeShort(this.reserved1);
                writer.writeShort(this.reserved2);
                writer.writeInt(fileOffsetToPixelArray);
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }

        public String toString() {
            String returnValue
                    = "<FileHeader "
                    + "signature='" + this.signature + "' "
                    + "fileSize='" + this.fileSize + "' "
                    + "fileOffsetToPixelArray ='" + this.fileOffsetToPixelArray + "' "
                    + "/>";

            return returnValue;
        }
    }

    public static abstract class DIBHeader {

        public String name;
        public int sizeInBytes;

        public DIBHeader(String name, int sizeInBytes) {
            this.name = name;
            this.sizeInBytes = sizeInBytes;
        }

        public static class Instances {

            public static DIBHeader BitmapInfo = new DIBHeaderBitmapInfo();
            //public static DIBHeader BitmapV5 = new DIBHeaderV5();
        }

        public static DIBHeader buildFromStream(DataInputStreamLittleEndian reader) {
            DIBHeader returnValue = null;

            try {
                int dibHeaderSizeInBytes = reader.readInt();

                // hack
                if (dibHeaderSizeInBytes == 40) {
                    returnValue = new DIBHeaderBitmapInfo().readFromStream(reader);
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }

            return returnValue;
        }

        public int[] readColorTable(DataInputStreamLittleEndian reader) {
            // todo
            return new int[]{};
        }

        // abstract method headers
        public abstract int bitsPerPixel();

        public abstract DIBHeader readFromStream(DataInputStreamLittleEndian reader);

        public abstract int imageSizeInBytes();

        public abstract Coords imageSizeInPixels();

        public abstract void writeToStream(DataOutputStreamLittleEndian reader);
    }

    public static class DIBHeaderBitmapInfo extends DIBHeader {

        public Coords imageSizeInPixels;
        public short planes;
        public short bitsPerPixel;
        public int compression;
        public int imageSizeInBytes;
        public Coords pixelsPerMeter;
        public int numberOfColorsInPalette;
        public int numberOfColorsUsed;

        public DIBHeaderBitmapInfo() {
            super("BitmapInfo", 40);
        }

        public DIBHeaderBitmapInfo(
                int sizeInBytes,
                Coords imageSizeInPixels,
                short planes,
                short bitsPerPixel,
                int compression,
                int imageSizeInBytes,
                Coords pixelsPerMeter,
                int numberOfColorsInPalette,
                int numberOfColorsUsed
        ) {
            this();

            this.sizeInBytes = sizeInBytes;
            this.imageSizeInPixels = imageSizeInPixels;
            this.planes = planes;
            this.bitsPerPixel = bitsPerPixel;
            this.compression = compression;
            this.imageSizeInBytes = imageSizeInBytes;
            this.pixelsPerMeter = pixelsPerMeter;
            this.numberOfColorsInPalette = numberOfColorsInPalette;
            this.numberOfColorsUsed = numberOfColorsUsed;

            if (this.imageSizeInBytes == 0) {
                this.imageSizeInBytes
                        = this.imageSizeInPixels.x
                        * this.imageSizeInPixels.y
                        * this.bitsPerPixel
                        / 8;
            }
        }

        public String toString() {
            String returnValue
                    = "<DIBHeader "
                    + "size='" + this.sizeInBytes + "' "
                    + "imageSizeInPixels='"
                    + this.imageSizeInPixels.x + ","
                    + this.imageSizeInPixels.y + "' "
                    + "planes='" + this.planes + "' "
                    + "bitsPerPixel='" + this.bitsPerPixel + "' "
                    + "compression='" + this.compression + "' "
                    + "imageSizeInBytes='" + this.imageSizeInBytes + "' "
                    + "pixelsPerMeter='"
                    + this.pixelsPerMeter.x + ","
                    + this.pixelsPerMeter.y + "' "
                    + "numberOfColorsInPalette='" + this.numberOfColorsInPalette + "' "
                    + "numberOfColorsUsed='" + this.numberOfColorsUsed + "' "
                    + "/>";

            return returnValue;
        }

        // DIBHeader members
        public int bitsPerPixel() {
            return this.bitsPerPixel;
        }

        public DIBHeader readFromStream(DataInputStreamLittleEndian reader) {
            DIBHeader dibHeader = null;

            try {
                dibHeader = new DIBHeaderBitmapInfo(
                        this.sizeInBytes, // dibHeaderSize;
                        // imageSizeInPixels
                        new Coords(
                                reader.readInt(),
                                reader.readInt()
                        ),
                        reader.readShort(), // planes;
                        reader.readShort(), // bitsPerPixel;
                        reader.readInt(), // compression;
                        reader.readInt(), // imageSizeInBytes;
                        // pixelsPerMeter
                        new Coords(
                                reader.readInt(),
                                reader.readInt()
                        ),
                        reader.readInt(), // numberOfColorsInPalette
                        reader.readInt() // numberOfColorsUsed
                );
            } catch (Exception ex) {
                ex.printStackTrace();
            }

            return dibHeader;
        }

        public int imageSizeInBytes() {
            return this.imageSizeInBytes;
        }

        public Coords imageSizeInPixels() {
            return this.imageSizeInPixels;
        }

        public void writeToStream(DataOutputStreamLittleEndian writer) {
            try {
                writer.writeInt(this.sizeInBytes);
                writer.writeInt(this.imageSizeInPixels.x);
                writer.writeInt(this.imageSizeInPixels.y);

                writer.writeShort(this.planes);
                writer.writeShort(this.bitsPerPixel);
                writer.writeInt(this.compression);
                writer.writeInt(this.imageSizeInBytes);

                writer.writeInt(this.pixelsPerMeter.x);
                writer.writeInt(this.pixelsPerMeter.y);

                writer.writeInt(numberOfColorsInPalette);
                writer.writeInt(numberOfColorsUsed);
            } catch (Exception ex) {
                ex.printStackTrace();
            }

        }
    }
}

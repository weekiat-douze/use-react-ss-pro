import html2canvas, { type Options } from "html2canvas-pro";
import { useState, } from 'react';


type ImageFormat = "image/png" | "image/jpeg" | "image/webp"

/**
 * React Hook to generate screenshot from DOM nodes
 * @param imageFormat - to configure image format when converting canvas 
 * @param quality - to confgiure quality when converting canvas
 * @returns - React hook that uses HTML2Canvas-pro to take screenshot
 */
function useScreenshot(imageFormat: ImageFormat = "image/jpeg", quality: number = 1): [string | null, (domNode: any, options?: Partial<Options>) => Promise<string>] {
    if (quality < 0 || quality > 1) {
        throw new Error("Image quality should be between 0 and 1");
    }

    const [image, setImage] = useState<string | null>(null);

    const takeScreenshot = async (domNode: any, options: Partial<Options> = {}) => {
        if (!domNode) {
            throw new Error("Invalid DOM node");
        }


        const canvas = await html2canvas(domNode, options)

        const resultCanvas = document.createElement('canvas');
        const resultCanvasContext = resultCanvas.getContext('2d');
        resultCanvas.width = canvas.width;
        resultCanvas.height = canvas.height;
        resultCanvasContext?.drawImage(canvas, 0, 0);

        const base64Image = resultCanvas.toDataURL(imageFormat, quality)

        setImage(base64Image)
        return base64Image
    }

    return [image, takeScreenshot];
};

/**
 * Function that triggers download of the provided image 
 * @param {string} image - Base64 encoding of the image
 * @param {string} imageName - The filename name to use for the image to be downloaded
 */
function triggerDownload(image: string, imageName: string) {
    const a = document.createElement("a");
    a.href = image;
    a.download = imageName;
    a.click();
}

// Named export
export { useScreenshot, triggerDownload }


/**
 * Image Processing Utility
 * Converts images to WebP format and compresses them
 */

export interface ImageProcessingOptions {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number; // 0 to 1
    outputFormat?: 'webp' | 'jpeg' | 'png';
}

const DEFAULT_OPTIONS: ImageProcessingOptions = {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 0.85,
    outputFormat: 'webp',
};

/**
 * Converts and compresses an image file to WebP format
 * @param file - The original image file
 * @param options - Processing options
 * @returns Promise<File> - The processed image file
 */
export async function processImage(
    file: File,
    options: ImageProcessingOptions = {}
): Promise<File> {
    const opts = { ...DEFAULT_OPTIONS, ...options };

    return new Promise((resolve, reject) => {
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            reject(new Error('File is not an image'));
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                try {
                    // Create canvas
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    if (!ctx) {
                        reject(new Error('Failed to get canvas context'));
                        return;
                    }

                    // Calculate new dimensions while maintaining aspect ratio
                    let { width, height } = img;
                    const maxWidth = opts.maxWidth!;
                    const maxHeight = opts.maxHeight!;

                    if (width > maxWidth || height > maxHeight) {
                        const aspectRatio = width / height;

                        if (width > height) {
                            width = maxWidth;
                            height = width / aspectRatio;
                        } else {
                            height = maxHeight;
                            width = height * aspectRatio;
                        }
                    }

                    // Set canvas dimensions
                    canvas.width = width;
                    canvas.height = height;

                    // Draw image on canvas
                    ctx.drawImage(img, 0, 0, width, height);

                    // Convert to blob
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error('Failed to convert image to blob'));
                                return;
                            }

                            // Create new file from blob
                            const originalName = file.name.replace(/\.[^/.]+$/, '');
                            const extension = opts.outputFormat === 'webp' ? 'webp' : opts.outputFormat === 'jpeg' ? 'jpg' : 'png';
                            const newFile = new File(
                                [blob],
                                `${originalName}.${extension}`,
                                { type: `image/${opts.outputFormat}` }
                            );

                            console.log(`Image processed: ${file.size} bytes -> ${newFile.size} bytes (${Math.round((1 - newFile.size / file.size) * 100)}% reduction)`);
                            resolve(newFile);
                        },
                        `image/${opts.outputFormat}`,
                        opts.quality
                    );
                } catch (error) {
                    reject(error);
                }
            };

            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };

            img.src = e.target?.result as string;
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(file);
    });
}

/**
 * Process image specifically for cover images (larger size)
 */
export async function processCoverImage(file: File): Promise<File> {
    return processImage(file, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.85,
        outputFormat: 'webp',
    });
}

/**
 * Process image for editor content (medium size)
 */
export async function processEditorImage(file: File): Promise<File> {
    return processImage(file, {
        maxWidth: 1200,
        maxHeight: 800,
        quality: 0.80,
        outputFormat: 'webp',
    });
}

/**
 * Process thumbnail images (small size)
 */
export async function processThumbnail(file: File): Promise<File> {
    return processImage(file, {
        maxWidth: 400,
        maxHeight: 300,
        quality: 0.75,
        outputFormat: 'webp',
    });
}

// function to resize squared images to given size

const { createCanvas } = require('canvas');

const resizeImage = (image, size) => {
    const resizedImage = createCanvas(size, size);
    const imgCtx = resizedImage.getContext('2d');
    imgCtx.drawImage(image, 0, 0, size, size);
    return resizedImage;
}

module.exports = resizeImage;
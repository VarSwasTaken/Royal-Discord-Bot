const { createCanvas } = require('canvas');

exports.applyText = (canvas, text, size, space) => {
    const context = canvas.getContext('2d');

    let fontSize = size + 5;
    do {
        context.font = `${fontSize -= 5}px Montserrat`;
    } while (context.measureText(text).width > space);

    return context.font;
};

exports.resizeImage = (image, width, height) => {
    const resizedImage = createCanvas(width, height);
    const imgCtx = resizedImage.getContext('2d');
    imgCtx.drawImage(image, 0, 0, width, height);
    return resizedImage;
} 
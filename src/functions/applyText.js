// function to make font size smaller if it doesn't fit in the given space

const applyText = (canvas, text, size, space) => {
    const context = canvas.getContext('2d');

    let fontSize = size + 5;
    do {
        context.font = `${fontSize -= 5}px Montserrat`;
    } while (context.measureText(text).width > space);

    return context.font;
};

module.exports = applyText;
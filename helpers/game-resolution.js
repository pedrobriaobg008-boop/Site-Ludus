// Native canvas sizes inspected on maisludus.com.br. Desktop Unity templates
// with a footer need 38px for its controls plus the inline canvas baseline gap.
const profiles = {
    '69bd3241a538cca25db9ae91': [960, 600],
    '69c27855b71b813b0a419ff1': [960, 600],
    '69c278d3b71b813b0a419ff5': [960, 600],
    '69c282c0a67263434b00b2a0': [960, 648],
    '69c283dfa67263434b00b2a8': [960, 648],
    '69c28957a55627aa72961695': [960, 648],
    '69c289a573e08a3825f6393c': [960, 648],
    '69c28a6273e08a3825f63945': [960, 648],
    '69c28ade73e08a3825f63949': [900, 523],
    '69c28c3c73e08a3825f63951': [960, 648],
    '69c29010fe1962c51a0f7a98': [960, 648],
    '69c29056fe1962c51a0f7a9c': [960, 648],
    '69c2910cfe1962c51a0f7aa4': [1280, 768]
};

module.exports = function gameResolution(game) {
    const [width, height] = profiles[String(game._id)] || [1280, 800];
    const valid = value => Number.isInteger(value) && value >= 240 && value <= 7680;
    return {
        width: valid(game.resolucao_largura) ? game.resolucao_largura : width,
        height: valid(game.resolucao_altura) ? game.resolucao_altura : height
    };
};

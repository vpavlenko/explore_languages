define(['layers/layer'],
function (layer) {
    "use strict";

    var EnglishTranslationLayer = function (sentence, language, time) {
        layer.Layer.call(this, sentence, language, time);
    };

    EnglishTranslationLayer.prototype = new layer.Layer();

    EnglishTranslationLayer.prototype.get_name = function () {
        return 'english_translation';
    };

    return {
        EnglishTranslationLayer: EnglishTranslationLayer
    };
});

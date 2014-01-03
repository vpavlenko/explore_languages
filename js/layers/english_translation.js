define(['backends/main', 'layers/layer'],
function (backends, layer) {
    "use strict";

    var EnglishTranslationLayer = layer.build_layer_subclass('english_translation');

    return {
        EnglishTranslationLayer: EnglishTranslationLayer
    };
});

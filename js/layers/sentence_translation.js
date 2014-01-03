define(['backends/main', 'layers/layer'],
function (backends, layer) {
    "use strict";

    var SentenceTranslationLayer = layer.build_layer_subclass('sentence_translation');

    return {
        SentenceTranslationLayer: SentenceTranslationLayer
    };
});

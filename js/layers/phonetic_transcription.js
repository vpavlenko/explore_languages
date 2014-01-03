define(['layers/layer'],
function (layer) {
    "use strict";

    var PhoneticTranscriptionLayer = function (sentence, language, time) {
        layer.Layer.call(this, sentence, language, time);
    };

    PhoneticTranscriptionLayer.prototype.name = 'phonetic_transcription';

    PhoneticTranscriptionLayer.prototype = new layer.Layer();

    return {
        PhoneticTranscriptionLayer: PhoneticTranscriptionLayer
    };
});

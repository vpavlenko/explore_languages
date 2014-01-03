define(['jquery', 'backends/yandex', 'backends/freeling'],
function ($, yandex, freeling) {
    "use strict";

    function find_backend(language, layer_name) {
        if (layer_name == 'sentence_translation') {
            return yandex.translation;
        // } else if (layer_name == 'phonetic_transcription') {
        //     return freeling.transcription;
        } else {
            console.log('unable to find backend for ', language, layer_name);
        }
    }

    return {
        detect_language: yandex.detect_language,
        find_backend: find_backend
    };
});

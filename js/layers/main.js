requirejs(['backends/main', 'layers/phonetic_transcription'],
    function(backends, phonetic_transcription) {
        "use strict";

        var WORD_SCOPE = 0,
            SENTENCE_SCOPE = 1;

        var AVAILABLE_LAYERS = {
            'phonetic_transcription': phonetic_transcription.layer
        };

        var SELECTED_LAYERS = AVAILABLE_LAYERS;
        // TODO: allow user to enable/disable layers

        function get_selected_layers() {

        }

        return {
            get_selected_layers: get_selected_layers;
        };
    });

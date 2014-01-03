requirejs(['backends/main', 'layers/phonetic_transcription'],
    function ($, backends, phonetic_transcription) {
        "use strict";

        var WORD_SCOPE = 0,
            SENTENCE_SCOPE = 1;

        var AVAILABLE_LAYERS = {
            'phonetic_transcription': phonetic_transcription.layer
        };

        var SELECTED_LAYERS = AVAILABLE_LAYERS;
        // TODO: allow user to enable/disable layers

        var layers_container;

        function get_selected_layers() {
            return SELECTED_LAYERS;
        }

        function clear_layers() {

        }

        function set_layers_container(tag) {
            layers_container = tag;
        }

        return {
            clear_layers: clear_layers,
            set_layers_container: set_layers_container,
            get_selected_layers: get_selected_layers
        };
    });

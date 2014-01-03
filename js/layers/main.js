define(['require', 'jquery', 'backends/main',
    'layers/phonetic_transcription',
    'layers/english_translation'],
function (require, $, backends,
    phonetic_transcription,
    english_translation) {
    "use strict";

    var WORD_SCOPE = 0,
        SENTENCE_SCOPE = 1;

    var AVAILABLE_LAYERS = [
        // phonetic_transcription.PhoneticTranscriptionLayer,
        english_translation.EnglishTranslationLayer
    ];

    var SELECTED_LAYERS = AVAILABLE_LAYERS;
    // TODO: allow user to enable/disable layers

    var layers_container;

    function get_selected_layers() {
        return SELECTED_LAYERS;
    }

    function clear_layers() {
        layers_container.html();
        for (var i in SELECTED_LAYERS) {
            var layer_container = ($('<div>')
                .addClass('layer-container')
                .attr('data-name', SELECTED_LAYERS[i].prototype.get_name())
            );
            layers_container.append(layer_container);
        }
    }

    function set_layers_container(tag) {
        layers_container = tag;
    }

    function publish(time, name, tags) {
        if (time == require('explore').get_time()) {
            (layers_container
                .find('.layer-container[data-name=' + name + ']')
                .html(tags)
            );
        }
    }

    return {
        clear_layers: clear_layers,
        set_layers_container: set_layers_container,
        get_selected_layers: get_selected_layers,
        publish: publish
    };
});

define(['jquery', 'layers/main', 'backends/main', 'suggests'],
function ($, layers, backends, suggests) {
    "use strict";

    /**
     * Time is used to attach versions to backend queries.  It helps avoid
     * showing stall results to the user.
     */
    var time = 0;

    /**
     * @return {string} language code: ISO-639-1, if exists, otherwise
     *     ISO-639-2.
     */

    function start_explore_pipeline() {
        var sentence = $('#sentence-field').val();
        time++;

        backends.detect_language(sentence, function (language) {
            var selected_layers = layers.get_selected_layers(language);

            for (var i in selected_layers) {
                var LayerClass = selected_layers[i];
                (new LayerClass(sentence, language, time)).start_layer_pipeline();
            }
        });
    }

    $(document).ready(function () {
        layers.set_layers_container($('#layers'));
        layers.clear_layers();

        $('#sentence-field').keyup(function () {
            start_explore_pipeline();
        });

        $('#go-button').click(function() {
            start_explore_pipeline();
        });
    });

    return {
        get_time: function () {
            return time;
        },
        start_explore_pipeline: start_explore_pipeline
    };
});

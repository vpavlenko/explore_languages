requirejs(['jquery', 'layers/main', 'backends/main'],
    function ($, layers, backends) {
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
        function detect_language(sentence) {
            return 'es';
            // TODO: implement true language detection.
            // return backends.detect_language(sentence);
        }

        function start_explore_pipeline() {
            var sentence = $('sentence-field').val();
            time++;

            var language = detect_language(sentence);
            var selected_layers = layers.get_selected_layers(language);

            for (var i in selected_layers) {
                var LayerClass = selected_layers[i];
                (new LayerClass(sentence, language, time)).start_layer_pipeline();
            }
        }

        $(document).ready(function () {
            layers.set_layers_container($('#layers'));

            $('sentence-field').keypress(function () {
                start_explore_pipeline();
            });
        });
    });

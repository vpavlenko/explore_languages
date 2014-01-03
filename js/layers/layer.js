define(["require", "backends/main"],
function(require, backends) {
    "use strict";

    // var WORD_SCOPE = 0,
    //     SENTENCE_SCOPE = 1;

    /**
     * Layer is a base class for concrete layers.  Every concrete layer is
     * a subclass of Layer class.  It provides some kind of linguistic
     * information.  For example, there can be layers for phonetic
     * transcription, dictionary articles, morphology parsing, POS tagging.
     *
     * Every time the system tries to obtain some linguistic information
     * it creates an object of a correspondent Layer subclass.
     *
     * @param {string} sentence
     * @param {string} language See definition of 'detect_language' in
     *     ROOT/main.js
     * @param {number} time See definition of 'time' in ROOT/main.js
     */
    var Layer = function (sentence, language, time) {
        if (sentence !== undefined) {
            // true constructor call

            this.sentence = sentence;
            this.language = language;
            this.time = time;

            this.sentence_to_words();
        }
        // else branch is taken when new Layer() called to fill
        // the subclass prototype
    };

    Layer.prototype.start_layer_pipeline = function () {
        var _this = this;

        this.send_request_to_backend(function () {
            require("layers/main").publish(
                _this.time,
                _this.get_name(),
                _this.json_to_tags(_this.json)
            );
        });
    };

    Layer.prototype.sentence_to_words = function () {
        this.words = (this.sentence
            .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
            .replace(/\s{2,}/g, ' ')
            .split(' '));
    };

    Layer.prototype.send_request_to_backend = function (callback) {
        var _this = this;
        var backend = backends.find_backend(this.language, this.get_name());

        backend.execute_request(this.sentence, function (json) {
            _this.json = json;
            callback();
        });
    };

    Layer.prototype.json_to_tags = function (json) {
        return $('<span>').text(json.data);
    };

    Layer.prototype.source_to_tags = function (source) {
        return this.source_to_tags(this.receive_data(source));
    };

    function build_layer_subclass(layer_name) {
        var NewLayer = function (sentence, language, time) {
            Layer.call(this, sentence, language, time);
        };

        NewLayer.prototype = new Layer();

        NewLayer.prototype.get_name = function () {
            return layer_name;
        };

        return NewLayer;
    }

    return {
        // WORD_SCOPE: WORD_SCOPE,
        // SENTENCE_SCOPE: SENTENCE_SCOPE,
        Layer: Layer,
        build_layer_subclass: build_layer_subclass
    };
});

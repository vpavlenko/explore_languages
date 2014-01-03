define(["require"],
function(require) {
    "use strict";

    var WORD_SCOPE = 0,
        SENTENCE_SCOPE = 1;

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
    };

    Layer.prototype.start_layer_pipeline = function () {
        var _this = this;
        console.log('started ', this.get_name(), ' on ', this);
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

    /**
     * Send a request to backend to receive layer data for the source.
     * Source is a word or a sentence (depends on this.scope).
     * Store response in this.json.
     */
    Layer.prototype.send_request_to_backend = function (callback) {
        this.json = {'data': this.words.join(', ')};
        callback();
    };

    Layer.prototype.json_to_tags = function (json) {
        return $('<span>').text(json.data);
    };

    Layer.prototype.source_to_tags = function (source) {
        return this.source_to_tags(this.receive_data(source));
    };


    return {
        WORD_SCOPE: WORD_SCOPE,
        SENTENCE_SCOPE: SENTENCE_SCOPE,
        Layer: Layer
    };
});

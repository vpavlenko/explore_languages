define(function() {
    "use strict";

    var WORD_SCOPE = 0,
        SENTENCE_SCOPE = 1;

    function Layer(scope) {
        /*
         * Layer is a base class which provides linguistic information.
         * Layer may provide phonetic transcription, translation, dictionary
         * articles and so on.
         *
         * @param {number} scope May be WORD_SCOPE (provides info for every word in
         *     a sentence) or SENTENCE_SCOPE (provides info for every
         *     sentence)
         */
         this.scope = scope;
    }

    Layer.prototype.receive_data = function(source) {
        /* 
         * Send a request to backend to receive layer data for the source.
         * Source is a word or a sentence (depends on this.scope).
         *
         * @return: JSON data with layer info which can be then passed to
         *     data_to_tags method
         */

    };

    Layer.prototype.data_to_tags = function(data) {

    };

    Layer.prototype.source_to_tags = function(source) {
        return this.source_to_tags(this.receive_data(source));
    };

    return {
        Layer: Layer
    };
});

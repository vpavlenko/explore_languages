define(['jquery'],
function ($) {
    "use strict";

    var YANDEX_TRANSLATE_API_KEY = 'trnsl.1.1.20140103T063303Z.7b127876ae672eee.d645e6ee1e55819565fea59e10424073bd43949b';



    function find_backend(language, layer_name) {
        language = 'es';
        layer_name = 'english_translation';
        return {
            execute_request: function (sentence, callback) {
                $.get('https://translate.yandex.net/api/v1.5/tr.json/translate',
                    {
                        'key': YANDEX_TRANSLATE_API_KEY,
                        'text': sentence,
                        'lang': language + '-en'
                    }
                ).done(function (data) {
                    callback({
                        'data': data.text[0]
                    });
                }).fail(function () {
                    console.log('failed to request to Yandex.Translate');
                });
            }
        };
    }

    return {
        find_backend: find_backend
    };
});

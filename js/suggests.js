define(['jquery', 'require'],
function ($, require) {
    "use strict";

    var SUGGESTS = [
        'Alderdom beskytter ikke mod dårskab',
        'Ki a kicsit nem becsüli, a nagyot nem érdemli',
        'Ratolí que no més coneix un forat, està atrapat',
        'La hierba mala presto crece y antes de tiempo envejece',
        'Wenn der Schreiber nichts taugt, ist die Feder schuld',
        'Ptak w złotej klatce niewesoło śpiewa'
    ];

    var last_index = -1;

    function roll_suggest() {
        var random_index;

        while (true) {
            random_index = Math.floor(Math.random() * SUGGESTS.length);
            if (random_index != last_index) {
                break;
            }
        }
        last_index = random_index;
        $('#suggest').text(SUGGESTS[last_index]);
    }

    $(document).ready(function () {
        $('#suggest').click(function() {
            $('#sentence-field').val($('#suggest').text());
            require("explore").start_explore_pipeline();
            $('#suggest').fadeTo(300, 0);
            setTimeout(function () {
                roll_suggest();
                $('#suggest').fadeTo(300, 100);
            }, 800);
        });

        roll_suggest();
    });

    return {

    };
});

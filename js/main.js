requirejs.config({
    "paths": {
      "jquery": "http://code.jquery.com/jquery-1.10.1.min"
    }
});

requirejs(['explore'],
function (explore) {
    "use strict";

    explore.start();
});

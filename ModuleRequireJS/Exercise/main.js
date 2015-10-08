require.config({
        paths: {
            'jquery': 'bower_components/jquery/dist/jquery',
            'domready': 'bower_components/requirejs-domready/domReady'

        }
    })

    require(['jquery', 'domready'], function($, domReady, message) {

        domReady(function() {
            $('#output').html('this works');
        });

    });


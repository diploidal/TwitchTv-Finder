$(document).ready(function() {
    $('#searchUser').on('keyup', function(e) {
        let userName = e.target.value;

        // Twitch request

        $.ajax({
            type:'GET',
            url:'https://api.twitch.tv/kraken/channels/lirik',
                header:{
                    'Client-ID':'5tdzz2mcd55pe9bww0uxrduwr44vc7',
            },
            success: function(data) {
                console.log(data);
            }

        });
    });
});
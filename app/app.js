document.addEventListener('submit', function(){
    document.getElementById('searchBtn');
    
    $(document).ready(function() {
    $('#searchBtn').on('click', function(e) {
        let userName = e.target.value;

        // Twitch request
        $.ajax({
            type:'GET',
            url:'https://api.twitch.tv/kraken/users/' + userName,
                headers:{
                    'Client-ID':'5tdzz2mcd55pe9bww0uxrduwr44vc7',
            },
            success: function(data) {
                console.log(data);
            }

        });
    });
});




});



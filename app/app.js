let root_URL = 'https://api.twitch.tv/kraken';
let channel_URL = 'https://api.twitch.tv/kraken/channels/';
let client_ID = '5tdzz2mcd55pe9bww0uxrduwr44vc7'; 

document.addEventListener('DOMContentLoaded', function(event){
    console.log("DOM properly loaded");
    $(document).ready(function(e) {
        $('#searchUser').on('change', function(e){
            let userName = e.target.value;

            //MAKING TWITCH REQUEST
            $.ajax({
                type: 'GET',
                url: channel_URL + userName,
                headers:{
                    'Client-ID':client_ID,
                },
                success: function(data1) {
                    console.log(data1);
                }
            });
        });
    });
    
});
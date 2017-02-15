let root_URL = 'https://api.twitch.tv/kraken';
let channel_URL = 'https://api.twitch.tv/kraken/channels/';
let client_ID = '5tdzz2mcd55pe9bww0uxrduwr44vc7';

document.addEventListener('DOMContentLoaded', function(event) {
    console.log("DOM properly loaded");
    $(document).ready(function(e) {
        $('#searchUser').on('change', function(e) {
           e.preventDefault(); //PREVENT SITE RELOAD !
            let userName = e.target.value;

            //MAKING TWITCH REQUEST
            $.ajax({
                type: 'GET',
                url: channel_URL + userName,
                headers: {
                    'Client-ID': client_ID,
                },
                success: function(channel_info) {
                    console.log(channel_info);
                    $("#profile").html(`
                     <div class="container">
                      <div class="card sticky-action hoverable">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img class="activator" src="${channel_info.logo}">
                        </div>
                        <div class="card-content">
                          <span class="card-title activator grey-text text-darken-4">${channel_info.display_name}<i class="material-icons right">more_vert</i></span>

                          <p>${channel_info.status} <br>Updated at ${channel_info.updated_at}</p>
                        </div>

                        <div class="card-action">
                          <a href="${channel_info.url}" target="_blank">Watch LIVE</a>
                          <a href="https://www.twitch.tv" target="_blank">Check Twitch.tv</a>
                        </div>

                        <div class="card-reveal">
                          <span class="card-title grey-text text-darken-4">${channel_info.display_name}<i class="material-icons right">close</i></span>
                          <p>${channel_info.status}</p>
                        </div>
                      </div>
                     </div>
                    `);
                }
            });
        });
    });

});

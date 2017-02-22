
var root_URL = 'https://api.twitch.tv/kraken';
var channel_URL = 'https://api.twitch.tv/kraken/channels/';
var client_ID = '5tdzz2mcd55pe9bww0uxrduwr44vc7';

document.addEventListener('DOMContentLoaded', function(event) {
    console.log("DOM loaded properly");
    $(document).ready(function(e) {
        $('#searchUser').on('change', function(e) {
           e.preventDefault(); //PREVENT SITE RELOAD !
            var userName = e.target.value;



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
                          <span class="card-title activator grey-text text-darken-4"><b>${channel_info.display_name}</b>
                          <i class="material-icons right">more_vert</i></span>

                          <p>${channel_info.status}</p>
                        </div>

                        <div class="card-action">
                          <b><a href="${channel_info.url}" target="_blank">Watch ${channel_info.display_name} LIVE</a></b>
                          <b><a href="https://www.twitch.tv" target="_blank" class="right">Check Twitch.tv</a></b>
                        </div>

                        <div class="card-reveal">
                          <span class="card-title grey-text text-darken-4">${channel_info.display_name}<i class="material-icons right">close</i></span>
                          <p>${channel_info.status}</p>
                          <p id="updated"><b>Updated status at: </b></p> 
                          <div class="divider"></div>
                          <p><b>Playing:</b> ${channel_info.game}</p>
                          <p><b>Followers:</b> ${channel_info.followers}</p>
                          <p><b>Total views:</b> ${channel_info.views}</p>
                          <p><b>Broadcaster language:</b> ${channel_info.broadcaster_language}</p>
                          <p id="partner"><b>Partnered:</b></p>
                          <p id="created"><b>Channel created:</b></p>
                        </div>
                      </div>
                      <iframe frameborder="10"
                        scrolling="yes"
                        id="${channel_info._id}"
                        src="${channel_info.url}/chat"
                        height="800"
                        width="400">
                      </iframe>
                     </div>
                    `);


                    // STATUS CHANGE TIME
                    function statusChange(){
                      var status = channel_info;
                      var lastUpade = Date.parse(status.updated_at);
                      var finalUpdate = new Date(lastUpade);
                        $("#updated").append("<span> " + finalUpdate + "</span>");
                    }
                    statusChange();
                    //CHANGING TRUE/FALSE STATEMENT IN TO STRING (FROM JSON REQUEST)
                    function isPartnered() {
                      var partnered = channel_info;
                      if(partnered.partner === true){
                        $("#partner").append("<span> Yes</span>")
                      } else {
                        $("#partner").append("<span> No</span>");
                      }
                    };
                    isPartnered();


                    // Parse date from JSON in to Epoch timestamp(unix timestamp) and convert in to standard format
                    function createdAt() {
                      var created = channel_info;
                      var epochDate = Date.parse(created.created_at);
                      var normalDate = new Date(epochDate);
                        $("#created").append("<span> " + normalDate + "</span>");
                    };
                    createdAt();
  


                }
            });
        });
    });
});

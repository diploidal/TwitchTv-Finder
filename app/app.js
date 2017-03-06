var root_URL = 'https://api.twitch.tv/kraken';
var channel_URL = 'https://api.twitch.tv/kraken/channels/';
var client_ID = '5tdzz2mcd55pe9bww0uxrduwr44vc7';

document.addEventListener('DOMContentLoaded', function (event) {
  console.log("DOM loaded properly");
  $(document).ready(function (e) {
    $('#searchUser').on('change', function (e) {
      e.preventDefault(); //PREVENT SITE RELOAD !
      var userName = e.target.value;



      //MAKING TWITCH REQUEST
      $.ajax({
        type: 'GET',
        url: channel_URL + userName,
        headers: {
          'Client-ID': client_ID,
        },
        success: function (channel_info) {
          console.log(channel_info);
          $("#profile").html(`
                     <div class="container main">
                      <div class="row">
                        <div class="col s12">
                          <ul class="tabs tabs-fixed-width hoverable">
                            <li class="tab col s4"><a class="active" href="#info">Channel Info</a></li>
                            <li class="tab col s4"><a href="#stream">Stream</a></li>
                            <li class="tab col s4"><a href="#addinfo">Additional Info</a></li>
                          </ul>
                        </div>
                        </div>
                        <div class="row">
                          <div id="info" class="col s12 center">
                              <div class="col s12 m6"><img src="${channel_info.logo}"></div>
                              <div class="col s12 m6"><p class="flow-text bold">${channel_info.display_name}</p></div>
                              <div class="col s12 m6"><p><b>Status:</b> ${channel_info.status}</p></div>
                              <div class="col s12 m6"><p><b>Playing:</b> ${channel_info.game}</p>
                                <div class="divider"></div>
                              </div>
                              <div class="col s12 m6"><p id="updated"><b>Status updated at: </b></p></div>
                              <div class="col s12 m6"><p><b>Followers:</b> ${channel_info.followers}</p></div>




                            </div>
                        </div>


                            <div id="stream" class="col s12 m2 l2">Test 2</div>
                            <div id="addinfo" class="col s12 m2 l2">Test 3</div>
                          </div>
                       </div>






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


                     </div> 

                      <div class="embedVideo">
                        <iframe
                          src="http://player.twitch.tv/?channel=${channel_info.name}"
                          height="720"
                          width="1280"
                          frameborder="10"
                          scrolling="no"
                          allowfullscreen="true">
                        </iframe>
                      </div>
                      <div class="embedChat">
                        <iframe frameborder="10"
                          scrolling="yes"
                          id="${channel_info._id}"
                          src="${channel_info.url}/chat"
                          height="720"
                          width="400">
                        </iframe>
                      </div>
                    `);


          // STATUS CHANGE TIME
          function statusChange() {
            var status = channel_info;
            var lastUpade = Date.parse(status.updated_at);
            var finalUpdate = new Date(lastUpade);
            $("#updated").append("<span> " + finalUpdate + "</span>");
          }
          statusChange();
          //CHANGING TRUE/FALSE STATEMENT IN TO STRING (FROM JSON REQUEST)
          function isPartnered() {
            var partnered = channel_info;
            if (partnered.partner === true) {
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

            $(document).ready(function(){
              $('ul.tabs').tabs();
            });


        }
      });
    });
  });
});
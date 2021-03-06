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
                          <ul class="tabs tabs-fixed-width">
                            <li class="tab col s4"><a class="active waves-effect" href="#info">Channel Info</a></li>
                            <li class="tab col s4"><a class="waves-effect" href="#stream">Stream</a></li>
                            <li class="tab col s4"><a class="waves-effect" href="#addinfo">Additional Info</a></li>
                          </ul>
                      </div>
                     </div>
                        <div class="row">
                          <div id="info" class="col s12 center">
                              <div class="col s12 m6"><img src="${channel_info.logo}"></div>
                              <div class="col s12 m6"><h4><b>${channel_info.display_name}</b></h4></div>
                              <div class="col s12 m6"><p><b>Status:</b> ${channel_info.status}</p></div>
                              <div class="col s12 m6"><p><b>Playing:</b> ${channel_info.game}</p></div>
                              <div class="col s12 m6"><p><b>Offline banner:</b></p><img src=${channel_info.video_banner}></div>
                            </div>
                        </div>

                        <div class="row">
                          <div id="stream" class="col s12">
                            <div class="video-container">
                              <iframe src="http://player.twitch.tv/?channel=${channel_info.name}"
                                height="720"
                                width="1280"
                                frameborder="0"
                                scrolling="no"
                                allowfullscreen="true">
                              </iframe>
                            </div>
                            <div class="center">
                              <iframe frameborder="0"
                                scrolling="yes"
                                id="${channel_info._id}"
                                src="${channel_info.url}/chat"
                                height="720"
                                width="320">
                              </iframe>
                              </div>
                           </div>
                        </div>
                        <div class="row">
                          <div id="addinfo" class="col s12 center">
                            <div class="col s12 m6"><img src="${channel_info.logo}"></div>
                            <div class="col s12 m6"><h4><b>${channel_info.display_name}</b></h4></div>
                            <div class="col s12 m6"><p><b>Status:</b> ${channel_info.status}</p></div>
                            <div class="col s12 m6"><p><b>Playing:</b> ${channel_info.game}</p>
                              <div class="divider"></div>
                            </div>
                            <div class="col s12 m6"><p id="updated"><b>Status updated: </b></p></div>
                            <div class="col s12 m6"><p id="partner"><b>Partnered: </b></p></div>
                            <div class="col s12 m6"><p id="created"><b>Channel created:</b> </p></div>
                            <div class="col s12 m6"><p id="follower-ammount"><b>Followers:</b> </p></div>
                            <div class="col s12 m6"><p id="total-views"><b>Total views: </b> </p></div>
                            <div class="col s12 m6"><p><b>Broadcaster language: </b>${channel_info.broadcaster_language}</p></div>
                          </div>
                        </div>
                       </div>
                     </div>
                    `);
          //Status time change
          function statusChange() {
            var status = channel_info;
            var lastUpade = Date.parse(status.updated_at);
            var finalUpdate = new Date(lastUpade).toUTCString();
            $("#updated").append("<span> " + finalUpdate + "</span>");
          }

          //Changing true/false statement in to string
          function isPartnered() {
            var partnered = channel_info;
            if (partnered.partner === true) {
              $("#partner").append("<span> Yes</span>")
            } else {
              $("#partner").append("<span> No</span>");
            }
          };

          // Parse date from JSON in to Epoch timestamp(unix timestamp) and convert in to standard format
          function createdAt() {
            var created = channel_info;
            var epochDate = Date.parse(created.created_at);
            var normalDate = new Date(epochDate).toUTCString();
            $("#created").append("<span> " + normalDate + "</span>");
          };

          //Tab initialization
            $(document).ready(function(){
              $('ul.tabs').tabs();
            });

            //Formating numbers with commas (followers and total views numbers)
            function addCommas() {
              var a = channel_info;
              var followerAmmount = ((a.followers).toLocaleString());
              var totalViews = ((a.views).toLocaleString());
              $("#follower-ammount").append("<span>" + followerAmmount + "</span>");
              $("#total-views").append("<span>" + totalViews + "</span>");
            }

          //   function embedIframe() {
          //     a=document.getElementsByClassName('video-container')[0];
          //     b=document.createElement('iframe');
          //     var link = "http://player.twitch.tv/?channel="+(channel_info.name);
          //     b.src=link;
          //     a.appendChild(b); 
          //   }
          // embedIframe();
            //Calling back all functions
          statusChange();
          isPartnered();
          createdAt();
          addCommas();
        }
      });
    });
  });
});
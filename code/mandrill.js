var api_key = 'bfTBnRfjZG8bGTALdwmLmQ';

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(api_key);
var mongoose = require('mongoose');
var Tester = require('./models/betatesters')
var MailChimpAPI = require('mailchimp').MailChimpAPI;
var apiKey = "89c7778356f7ddfc9cf55fbb0d5f5e09-us13"

function saveTester (body) {
  var tester = new Tester({
    email: body.contactEmailField.toUpperCase(),
    code: body.personalPromoCode.toUpperCase(),
    inviteeCode: body.contactMessageTextarea.toUpperCase(),
    date: new Date()
  })


  if (tester) {
    tester.save(function (err, savedTester) {
      if (err) {
        console.log(err);
        return err;
      } else {
        console.log(savedTester);
      }
    }) 
  }
  
  try {
    var api = new MailChimpAPI(apiKey, { version : '2.0' });
    var data = { id: '91cb1e461d', email_address: body.contactEmailField, status: "subscribed", timestamp_signup: new Date().toDateString() };
    api.call('lists', 'members', data, function (err, data) {
      if (err)
        console.log(err.message);
      else
        console.log(JSON.stringify(data)); // Do something with your data! 
    })
  } catch (error) {
    console.log(error.message);
  }
}

exports.sendEmail = function sendEmail (request, response) {

  if (process.env.ENV == "staging" || process.env.ENV == "production") {
    console.log('Request Received');
    var email = request.body.contactEmailField;
    var name = request.body.contactNameField;
    var message = request.body.contactMessageTextarea;
    var personalPromoCode = request.body.personalPromoCode;
    //Get an HTML document which is the body of the actual email
    var html = getHTMLDocument(email, name, message, personalPromoCode);
    //var from_email = 'customercare@smart-two.com';
    var from_email = 'graffiti@dephyned.com';
    var from_name = 'Dephyned Customer Info Form';
    console.log(request.body);
    var to_email = 'adebayoiji@gmail.com';

    var message = {
      'html' 			: html,
      'subject'		: 'You have a potential client!',
      'from_email' 	: from_email,
      'from_name'		: from_name,
      'to'			: [{
        email 	: to_email,
        name 	: 'Valued Customer',
        type    : 'to'
      }],
      'headers' : {
        'Reply-To'	: from_email
      },
      "important": false,
        "track_opens": null,
        "track_clicks": null,
        "auto_text": null,
        "auto_html": null,
        "inline_css": true,
        "url_strip_qs": null,
        "preserve_recipients": null,
        "view_content_link": null,
        "tracking_domain": null,
        "signing_domain": null,
        "return_path_domain": null,
        "merge": true
    };

    var async = false;
    var ip_pool = "Main Pool";
    //Time to send at in formation YYYY-MM-DD HH:MM:SS 
    var send_at = new Date()
    send_at.setDate(send_at.getDate() - 100);

    console.log('Time to send :' + send_at);

    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool }, 
      function(result) {
          console.log(result);
          var responseJSON = {
            status  : 200,	
            success : 'Updated Successfully'
          }
          
          response.end(JSON.stringify(responseJSON));
          
          if (personalPromoCode) {
            var promoHTML = getPromoDocument(personalPromoCode)
            var promoMessage = {
                'html' 			: promoHTML,
                'subject'		: 'Thank You For Signing Up As a Beta Tester and App Influencer For Graffiti!',
                'from_email' 	: 'graffiti@dephyned.com',
                'from_name'		: 'Graffiti App',
                'to'			: [{
                  email 	: email,
                  name 	: 'Valued Beta Tester and App Influencer',
                  type    : 'to'
                }],
                'headers' : {
                  'Reply-To'	: 'graffiti@dephyned.com'
                },
                "important": false,
                  "track_opens": true,
                  "track_clicks": true,
                  "auto_text": null,
                  "auto_html": null,
                  "inline_css": true,
                  "url_strip_qs": null,
                  "preserve_recipients": null,
                  "view_content_link": null,
                  "tracking_domain": null,
                  "signing_domain": null,
                  "return_path_domain": null,
                  "merge": true
            }
        
            mandrill_client.messages.send({"message": promoMessage, "async": async, "ip_pool": ip_pool }, 
            function(result) {
                console.log(result);
                var responseJSON = {
                  status  : 200,	
                  success : 'Updated Successfully'
                }
                saveTester(request.body);          
            }, function(e) {      
              // Mandrill returns the error as an object with name and message keys
              console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);          
              // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
            });
          }      
    }, function(e) {      
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        response.send('Failed to send');
        response.end();
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
  }
}

function changeDateToUSA (date)
{
	var delimiter = '/';
	var start = 0;
	var tokens = date.split(delimiter).slice(start);

	console.log(tokens);
	return tokens[0] + '/' + tokens[1] + '/' + tokens[2];
}

//
function getHTMLDocument (email, name, message, personalPromoCode) {
	var html = '<html>' +	
					'<head>' +
						'<style>' +
    						'body {' +
        					'font-family: "Avenir Next"; }' +
    						'#header {' +
        						'width: 100%;' +
        						'background-color: black; }' +
    						'#header-text {' +
        						'color: white;' +
        						'width: 25%;' +
        						'margin: auto;' +
        						'text-align: center;' +
        						'font-size: 50px; }' +
  							'#content {' +
        						'margin-left: 10%; }' +
    					'</style>' +
					'</head>' +
    				'<body>' +
    					'<div id = "header">' +
    						'<div id = "header-text">' +
        						'Dephyned' +
    						'</div>' +
						'</div>' +
						'<div id = "sub-heading">' +
    						'<h2>You have a potential customer!</h2>' +
    						'<hr>' +
						'</div>' +
						'<div id = "content">' +
    						'<p>Name: ' + name + '</p>' +
    						'<p>Email Address: ' + email + '</p>' +
                '<p>Message: ' + message + '</p>' +
                '<p>Personal Promo Code: ' + personalPromoCode.toUpperCase() + '</p>' +
						'</div>' +
					'</body>' +
				'</html>'	

	return html;
}

function getPromoDocument (personalPromoCode) {
  var html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  
  <head>
  
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
    <title>Bounce</title>
  
    <style type="text/css">
      body {
        width: 100%;
        background-color: #dbdad9;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        mso-margin-top-alt: 0px;
        mso-margin-bottom-alt: 0px;
        mso-padding-alt: 0px 0px 0px 0px;
      }
  
      p,
      h1,
      h2,
      h3,
      h4 {
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 0;
        padding-bottom: 0;
      }
  
      span.preheader {
        display: none;
        font-size: 1px;
      }
  
      html {
        width: 100%;
      }
  
      table {
        font-size: 12px;
        border: 0;
      }
  
      .menu-space {
        padding-right: 25px;
      }
  
  
      @media only screen and (max-width:640px) {
        body {
          width: auto!important;
        }
        body[yahoo] .main {
          width: 440px !important;
        }
        body[yahoo] .two-left {
          width: 420px !important;
          margin: 0px auto;
        }
        body[yahoo] .full {
          width: 100% !important;
          margin: 0px auto;
        }
        body[yahoo] .alaine {
          text-align: center;
        }
        body[yahoo] .menu-space {
          padding-right: 0px;
        }
        body[yahoo] .banner {
          width: 438px !important;
        }
        body[yahoo] .menu {
          width: 438px !important;
          margin: 0px auto;
          border-bottom: #e1e0e2 solid 1px;
        }
        body[yahoo] .date {
          width: 438px !important;
          margin: 0px auto;
          text-align: center;
        }
        body[yahoo] .two-left-inner {
          width: 400px !important;
          margin: 0px auto;
        }
        body[yahoo] .menu-icon {
          display: block;
        }
        body[yahoo] .two-left-menu {
          text-align: center;
        }
  
      }
  
      @media only screen and (max-width:479px) {
        body {
          width: auto!important;
        }
        body[yahoo] .main {
          width: 310px !important;
        }
        body[yahoo] .two-left {
          width: 300px !important;
          margin: 0px auto;
        }
        body[yahoo] .full {
          width: 100% !important;
          margin: 0px auto;
        }
        body[yahoo] .alaine {
          text-align: center;
        }
        body[yahoo] .menu-space {
          padding-right: 0px;
        }
        body[yahoo] .banner {
          width: 308px !important;
        }
        body[yahoo] .menu {
          width: 308px !important;
          margin: 0px auto;
          border-bottom: #e1e0e2 solid 1px;
        }
        body[yahoo] .date {
          width: 308px !important;
          margin: 0px auto;
          text-align: center;
        }
        body[yahoo] .two-left-inner {
          width: 280px !important;
          margin: 0px auto;
        }
        body[yahoo] .menu-icon {
          display: none;
        }
        body[yahoo] .two-left-menu {
          width: 310px !important;
          margin: 0px auto;
        }
  
        body[yahoo] .two-left-logo {
          width: 420px !important;
          margin: 0px auto;
        }
  
  
      }
    </style>
  
  </head>
  
  <body yahoo="fix" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
  
  
  
  
  
  
    <!--Top sapce start-->
  
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#dbdad9" id="backgroundTable" module="Menu">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" class="main">
              <tbody>
                <tr>
                  <td height="60" align="center" valign="top" style="line-height:60px;">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  
    <!--Top sapce End-->
  
  
  
    <!--Logo part start-->
  
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#dbdad9" id="backgroundTable" module="Menu">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" class="main">
              <tbody>
                <tr>
                  <td align="left" valign="top" bgcolor="#FFFFFF" style="background:#FFF;">
  
                    <table width="130" border="0" align="left" cellpadding="0" cellspacing="0" class="two-left">
  
                      <tbody>
                        <tr>
                          <td height="16" align="center" valign="middle" style="line-height:16px;">
                            <img src="http://dephyned.com/email/images/space.png" width="4" height="4" alt="">
                          </td>
                        </tr>
                        <tr class="imageUpload">
                          <td align="center" valign="middle" style="position: relative;">
  
  
  
  
  
                            <a href="#">
                              <img class="imgUp" src="http://dephyned.com/email/images/logo-text.png" width="93" height="29" alt="">
                            </a>
                          </td>
                        </tr>
  
                      </tbody>
                    </table>
  
                    <table width="250" border="0" align="right" cellpadding="0" cellspacing="0" class="two-left">
                      <tbody>
                        <tr>
                          <td height="20" align="center" valign="middle" style="line-height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td align="center" valign="middle">
                            <table border="0" align="left" cellpadding="0" cellspacing="0" class="two-left-inner">
                              <tbody>
                                <tr>
                                  <td align="center" valign="top" style="font-family: Verdana, Geneva, sans-serif; font-size: 14px; color: rgb(71, 70, 70); font-weight: lighter; position: relative;"
                                    class="editor mce-content-body" id="mce_0">email : graffiti@dephyned.com</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td height="22" align="center" valign="middle" style="line-height:22px;">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
  
  
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  
    <!--Logo part End-->
  
  
  
    <!--Banner part start-->
  
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#dbdad9" id="backgroundTable" module="Menu">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" class="main">
              <tbody>
                <tr class="imageUpload">
                  <td align="center" valign="top" bgcolor="#FFFFFF" style="background:#FFF; position:relative;">
                    <img class="imgUp" src="http://dephyned.com/email/images/graffitilogo-wide.jpg" width="700" height="460" style="display:block;width:100% !important; height:auto !important; "
                      alt="">
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--Banner part End-->
    <!--1-row-part start-->
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#dbdad9" module="Menu">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" class="main">
              <tbody>
                <tr>
                  <td align="left" valign="top" bgcolor="#34bbff" style="background:#34bbff;" class="inner-bgcolor">
                    <table width="350" border="0" align="left" cellpadding="0" cellspacing="0" class="full">
                      <tbody>
                        <tr class="imageUpload">
                          <td align="center" valign="top" style="position: relative;">
  
                            <img class="imgUp" src="http://dephyned.com/email/images/makemoney.jpeg" width="350" height="310" style="display:block;width:100% !important; height:auto !important; "
                              alt="">
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table width="315" border="0" align="right" cellpadding="0" cellspacing="0" class="two-left">
                      <tbody>
                        <tr>
                          <td align="left" valign="top">
                            <table width="280" border="0" align="left" cellpadding="0" cellspacing="0" class="two-left-inner">
                              <tbody>
                                <tr>
                                  <td height="10" align="left" valign="top" style="line-height:10px;">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top">
                                    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                      <tbody>
                                        <tr>
                                          <td align="left" valign="top" style="font-family: Verdana, Geneva, sans-serif; font-size: 20px; color: rgb(255, 255, 255); line-height: 32px; font-weight: normal; padding-bottom: 12px; position: relative;"
                                            class="editor mce-content-body" id="mce_262">THANKS FOR JOINING!</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top">
                                    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                      <tbody>
                                        <tr>
                                          <td align="left" valign="top" style="font-family: Verdana, Geneva, sans-serif; font-size: 13px; color: rgb(255, 255, 255); line-height: 22px; font-weight: normal; padding-bottom: 12px; position: relative;"
                                            class="editor mce-content-body" id="mce_263">Thank you for becoming a Beta Tester and App Influencer for Graffiti
                                            <br>
                                            <br>Follow our Facebook page to stay up to date and to make suggestions of features that you would like to see in the app
                                            <br>                                           
                                          </td>
                                        </tr>
  
                                        <tr>
                                          <td align="left" valign="top">
                                            <table width="205" border="0" cellspacing="0" cellpadding="0">
                                              <tbody>
                                                <tr>                                                
                                                  <td width="16" align="left" valign="middle" style="padding-top:2px;">
                                                    <a href="https://www.facebook.com/graffitimobileapp/?hc_ref=ARSzs-2tSDRSGn6aBK4PvRG9Ih1frfbtr4JES-dHQ_5sNXEG_p9iYzkJhCntrTTOytM&fref=nf" style="text-decoration: none; color: rgb(45, 179, 255); background: white; padding: 10px; border-radius: 5px; font-family: Verdana, Geneva, sans-serif; font-size: 12px;">Like Our Facebook Page</a>
                                                    <img src="http://dephyned.com/graffiti/images/arrow.png" width="16" height="16" alt="">
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="10" align="left" valign="top" style="line-height:10px;">&nbsp;</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
  
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  
    <!--1-row-part End-->
    <!--Quote part start-->
  
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#dbdad9" id="backgroundTable" module="Menu" style="margin-top: 2px; margin-bottom: 2px;">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" class="main">
              <tbody>
                <tr>
                  <td height="310" align="center" valign="middle" bgcolor="#1a1d26" class="banImg" style="background-image:url(http://dephyned.com/email/images/holdmoney.jpg); background-size:cover; width:100% !important;background-repeat: no-repeat; background-position:center; background-color:rgba(0, 0, 0, .7); height:310px;">
                    <table width="570" border="0" align="center" cellpadding="0" cellspacing="0" class="two-left">
                      <tbody>
                        <tr>
                          <td align="center" valign="top" style="font-family: Verdana, Geneva, sans-serif; font-size: 22px; color: rgb(255, 255, 255); line-height: 32px; font-weight: normal; padding-bottom: 12px; position: relative;"
                            class="editor mce-content-body" id="mce_18">Share on Facebook&nbsp;to get more followers, which will mean more money for you.<br><br><span style="font-size: 16px; font-weight: 500">When you share, make sure to tell your friends to enter the code ` + personalPromoCode.toUpperCase() + ` when they sign up</span></td>
                        </tr>
                        <tr>
                          <td align="center" valign="top">
                            <table width="215" border="0" cellspacing="0" cellpadding="0">
                              <tbody>
                                <tr>
                                  <td height="37" align="center" valign="middle" style="background:#34bbff;font-family:Verdana, Geneva, sans-serif; font-size:15px;color:#FFF;font-weight:bold;-moz-border-radius:4px;border-radius:4px;"
                                    class="inner-bgcolor">                                  
                                    <a href="https://www.facebook.com/graffitimobileapp/posts/157210838288884"
                                    data-mce-href="https://www.facebook.com/graffitimobileapp/posts/157210838288884" style="text-decoration: none; color: rgb(255, 255, 255); position: relative;" class="editor mce-content-body" id="mce_19">Share on Facebook</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td height="27" align="center" valign="top" style="line-height:27px;">&nbsp;</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  
    <!--Quote part End-->
  
    <!--1-row-part start-->
  
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#dbdad9" module="Menu">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" class="main">
              <tbody>
                <tr>
                  <td align="left" valign="top" bgcolor="#34bbff" style="background:#34bbff;" class="inner-bgcolor">
                    <table width="350" border="0" align="left" cellpadding="0" cellspacing="0" class="full">
                      <tbody>
                        <tr class="imageUpload">
                          <td align="center" valign="top" style="position: relative;">
                            <img class="imgUp" src="http://dephyned.com/email/images/mobileapp.jpeg" width="350" height="310" style="display:block;width:100% !important; height:auto !important; "
                              alt="">
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table width="315" border="0" align="right" cellpadding="0" cellspacing="0" class="two-left">
                      <tbody>
                        <tr>
                          <td align="left" valign="top">
                            <table width="280" border="0" align="left" cellpadding="0" cellspacing="0" class="two-left-inner">
                              <tbody>
                                <tr>
                                  <td height="35" align="left" valign="top" style="line-height:35px;">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top">
                                    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                      <tbody>
                                        <tr>
                                          <td align="left" valign="top" style="font-family: Verdana, Geneva, sans-serif; font-size: 20px; color: rgb(255, 255, 255); line-height: 32px; font-weight: normal; padding-bottom: 12px; position: relative;"
                                            class="editor mce-content-body" id="mce_265">INVITE FRIENDS</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top">
                                    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                                      <tbody>
                                        <tr>
                                          <td align="left" valign="top" style="font-family: Verdana, Geneva, sans-serif; font-size: 13px; color: rgb(255, 255, 255); line-height: 22px; font-weight: normal; padding-bottom: 12px; position: relative;"
                                            class="editor mce-content-body" id="mce_266">Invite friends by adding their emails to dephyned.com/graffiti
                                            <br>
                                            Make sure to enter the code ` + personalPromoCode.toUpperCase() + ` when you add their emails
                                            </td>
                                        </tr>
  
                                        <tr>
                                          <td align="left" valign="top">
                                            <table width="200" border="0" cellspacing="0" cellpadding="0">
                                              <tbody>
                                                <tr>
                                                  <td width="104" align="left" valign="middle" style="font-family: Verdana, Geneva, sans-serif; font-size: 12px; color: rgb(255, 255, 255); line-height: 24px; position: relative;"
                                                    class="editor mce-content-body" id="mce_267">
                                                    <a href="http://dephyned.com/graffiti" style="text-decoration: none; color: rgb(45, 179, 255); background: white; padding: 10px; border-radius: 5px;">Invite Friends</a>
                                                  </td>
                                                  <td width="16" align="left" valign="middle" style="padding-top:2px;">
                                                    <img src="http://dephyned.com/email/images/arrow.png" width="16" height="16" alt="">
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
  
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  
    <!--1-row-part End-->
    <!--Copyright start-->
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#dbdad9" id="backgroundTable" module="Menu" style="margin-top: 2px;">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" class="main">
              <tbody>
                <tr>
                  <td align="center" valign="top" bgcolor="#34bbff" style="background:#34bbff;" class="inner-bgcolor">
                    <table width="625" border="0" cellspacing="0" cellpadding="0" class="two-left">
                      <tbody>
                        <tr>
                          <td height="18" align="center" valign="top" style="line-height:18px;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td align="left" valign="top">
  
                            <table border="0" align="left" cellpadding="0" cellspacing="0" class="two-left">
                              <tbody>
                                <tr>
                                  <td align="center" valign="top" style="font-family: Verdana, Geneva, sans-serif; font-size: 13px; color: rgb(255, 255, 255); font-weight: normal; position: relative;"
                                    class="editor mce-content-body" id="mce_70">© 2018 Dephyned. All Rights Reserved.</td>
                                </tr>
                              </tbody>
                            </table>
  
                            <table border="0" align="right" cellpadding="0" cellspacing="0" class="two-left">
                              <tbody>
                                <tr>
                                  <td align="center" valign="top" style="font-family: Verdana, Geneva, sans-serif; font-size: 13px; color: rgb(255, 255, 255); font-weight: normal; position: relative;"
                                    class="editor mce-content-body" id="mce_71">
                                    <br data-mce-bogus="1">
                                  </td>
                                </tr>
                              </tbody>
                            </table>
  
                          </td>
                        </tr>
                        <tr>
                          <td height="18" align="center" valign="top" style="line-height:18px;">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  
    <!--Copyright End-->
    <!--Bottom space start-->
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#dbdad9" id="backgroundTable" module="Menu" style="margin-top: 2px;">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" class="main">
              <tbody>
                <tr>
                  <td height="60" align="center" valign="top" style="line-height:60px;">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--Bottom space End-->
  </body>
  
  </html>`
    return html;
}
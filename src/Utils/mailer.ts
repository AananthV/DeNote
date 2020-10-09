import config from "config";
import sgMail from "@sendgrid/mail";

const sendVerificationMail = async (
  email: string,
  verificationCode: string
) => {
  let html = getMailVerificationHtml(
    //prettier-ignore
    `${config.get<string>("server.domain")}${config.get<string>("server.proxy")}/api/auth/verify?email=${email}&code=${verificationCode}`
  );
  sgMail.setApiKey(config.get<string>("mail.sendgrid_key"));
  const data = {
    from: config.get<string>("mail.from_address"),
    to: email,
    // Customise this
    subject: "Verify your email : <Event Name> - <Domain> <Year>",
    html: html,
  };
  return sgMail.send(data);
};

const sendMailForNewPassword = (email: string, uniq_id: string) => {
  sgMail.setApiKey(config.get<string>("mail.sendgrid_key"));
  const data = {
    from: config.get<string>("mail.from_address"),
    to: email,
    subject: "Password Reset",
    html: `You have requested to change your password,click the link ${
      config.get<string>("server.domain") +
      config.get<string>("server.proxy") +
      "/user/resetPassword/" +
      uniq_id
    } to reset your password !`,
  };
  return sgMail.send(data);
};

const getMailVerificationHtml = (link: string) => {
  // Change the EDIT THIS parts to customise the template.
  let html = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet" type="text/css">
              <!-- EDIT THIS -->
              <title>Title</title>
          </head>
          </head>
          <body style="background-color: #e9ecef; font-family: Montserrat !important;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                  <td align="center" bgcolor="#e9ecef">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td align="center" valign="top" style="padding: 36px 24px;">
                              <!-- EDIT THIS -->
                              <a href="https://pragyan.com/">
                                  <img src="https://pragyan.com/assets/logo/pragyan-logo.png" style="height:100px;width:75px">
                              </a>
                              </a>
                              </td>
                          </tr>
                      </table>
                  </td>
                  </tr>
                  <tr>
                  <td align="center" bgcolor="#e9ecef">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; border-top: 3px solid #d4dadf;">
                              <h1 style="margin: 0; font-size: 25px; font-weight: 600; letter-spacing: -1px; line-height: 48px;">Hey
                                  <span> there! </span></h1>
                              </td>
                          </tr>
                      </table>
                  </td>
                  </tr>
                  <tr>
                  <td align="center" bgcolor="#e9ecef">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td align="left" bgcolor="#ffffff" style="padding: 24px;  font-size: 16px; line-height: 24px;">
                              <p style="margin: 0;">
                              <!-- EDIT THIS -->
                                  Thank you for registering for Crosswordyan - Pragyan 2021! Please use the following link to activate your account and get started.
                              </p>
                              </td>
                          </tr>
                          <tr>
                              <td align="left" bgcolor="#ffffff">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                      <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                          <table border="0" cellpadding="0" cellspacing="0">
                                          <tr>
                                              <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                                  <a href=${link} target="_blank" style="display: inline-block; padding: 16px 36px;  font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                                                      Verify
                                                  </a>
                                              </td>
                                          </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                              </td>
                          </tr>
                          <tr>
                              <td align="left" bgcolor="#fc7303">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                      <td bgcolor="#fc7303" style="padding: 0px;" align="center">
                                          <table border="0" cellpadding="0" cellspacing="5" style="margin-top: 20px; margin-bottom: 15px;">
                                          <!-- EDIT THIS -->
                                          <tr style="border-bottom: 15px">
                                              <td align="center">
                                                  <a href="https://www.facebook.com/pragyan/">
                                                      <img src="https://pragyan.com/assets/media/facebook-logo-black.png" style="height:30px;width:30px">
                                                  </a>
                                              </td>
                                              <td align="center">
                                                  <a href="https://www.instagram.com/pragyan/">
                                                      <img src="https://pragyan.com/assets/media/instagram-logo-black.png" style="height:30px;width:30px">
                                                  </a>
                                              </td>
                                          </tr>
                                          <tr class="spacer"></tr>
                                          <tr class="spacer"></tr>
                                          <tr>
                                              <td align="center" colspan=2 style="font-size: 13px; color: rgba(18,18,18,0.8); font-weight: 500"> &copy; Pragyan 2021 </td>
                                          </tr>
                                          <tr>
                                              <td align="center" colspan=2 style="font-size: 13px; color: rgba(18,18,18,0.8); font-weight: 500">All rights reserved</td>
                                          </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                              </td>
                          </tr>
                      </table>
                  </td>
                  </tr>
                  <tr>
                  <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px;  font-size: 14px; line-height: 20px; color: #666;">
                              <p style="margin: 0;">You received this email because we received a request for registration with your email account. If you didn't register you can safely delete this email.</p>
                              </td>
                          </tr>
                      </table>
                  </td>
                  </tr>
              </table>
          </body>
      </html>
      `;

  return html;
};

export { sendMailForNewPassword, sendVerificationMail };

const express = require('express')
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const path = require('path')
const hbs = require('nodemailer-express-handlebars');
const emailHelper = require('../helpers/emails')
const mailKeys = require('../mailKeys.json')
const EMAIL_ADDRESS_ADMIN = 'info@ulending.co'
const lendingRouter = express.Router()

const oauth2Client = new OAuth2(
  mailKeys.web.client_id, // ClientID
  mailKeys.web.client_secret, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: mailKeys.web.refresh_token
});


lendingRouter.use(express.json())
lendingRouter.use(express.urlencoded({extended: true}))

lendingRouter.post('/lending-request',function(req, res) {
  try {
    const form = req.body.form

    const {transport, closeTransport} = setupTransport()

    const sendEmailsOps = {
      context: form,
      transport
    }

    sendMail('client-request', {
      to: form.email,
      subject: `U Lending - ${form.name} recibimos tu Solicitud`,
      ...sendEmailsOps
    }, transport);

    sendMail('admin-request', {
      to: EMAIL_ADDRESS_ADMIN,
      context: form,
      subject: `${form.name} ${form.lastName} ha realizado una solicitud`,
      ...sendEmailsOps
    });

    closeTransport();

    res.status(200).json({ message: 'Tu solicitud fue enviada con éxito' })
    console.log('Email sent')
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: 'Tu solicitud no pudo ser enviada, intentalo de nuevo mas tarde, o contactanos' })
  }
})

module.exports = lendingRouter

const validateAndSanitize = (key, value) => {
  const rejectFunctions = {
    name: (v) => v.length < 4,
    email: (v) => !validator.isEmail(v),
    msg: (v) => v.length < 25
  }

  // If object has key and function returns false, return sanitized input. Else, return false
  return (
    rejectFunctions.hasOwnProperty(key) &&
    !rejectFunctions[key](value) &&
    xssFilters.inHTMLData(value)
  )
}

function setupTransport() {
  const accessToken = oauth2Client.getAccessToken()

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL_ADDRESS_ADMIN,
      clientId: mailKeys.web.client_id,
      clientSecret: mailKeys.web.client_secret,
      refreshToken: mailKeys.web.refresh_token,
      accessToken: accessToken
    }
  });

  transport.use('compile', hbs({
    viewEngine: {
      extName: '.hbs',
      partialsDir: 'server/templates/partials',
      layoutsDir: 'server/templates/',
      defaultLayout: ''
    },
    viewPath: 'server/templates',
    extName: '.hbs'
  }));

  return {
    transport,
    closeTransport() {
      transport.close()
    }
  }
}

function sendMail(template, { to, context, subject, transport}) {
    const attachments = emailHelper.getAttachmentsByTemplate(template)
    const mailOpts = {
      from: `U Lending <${EMAIL_ADDRESS_ADMIN}>`,
      to,
      subject: subject,
      template,
      context,
      attachments
    };

    transport.sendMail(mailOpts, (response, err) => {
      if (err) console.log(template, err)
      else console.log(template, response)
    });
}

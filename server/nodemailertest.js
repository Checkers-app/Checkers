var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'devmountaincheckersapp@gmail.com',
    pass: 'CheckersApp'
  }
});

var mailOptions = {
  from: 'devmountaincheckersapp@gmail.com',
  to: 'alexraia4@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'herp derp'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


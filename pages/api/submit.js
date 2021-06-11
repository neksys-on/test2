import nodemailer from 'nodemailer'

export default async(req, res) => {

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASS_EMAIL // generated ethereal password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: req.body.to,
    subject: req.body.title,
    text: req.body.text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.status(201)
  res.json({status: 'Complete'})


}




export default async function (req, res) {

  async function sendEmail( send_to , send_title , send_text ) {
    const email_API_URL = process.env.EMAIL_API_URL
    const responseEm = await fetch(email_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: send_to,
        title: send_title,
        text: send_text,
       }),
    })
  }
  sendEmail( req.body.to , req.body.title , req.body.text)

  res.status(201)
  res.json({status: 'Complete'})
}

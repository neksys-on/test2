import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req, res) {

  async function sendEmail( to , title , text ) {
    const email_API_URL = process.env.EMAIL_API_URL
    const responseEm = await fetch(email_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to,
        title,
        text
       }),
    })
    const resEm = await responseEm.json()
    return resEm
  }
  const resEmailSend = await sendEmail( req.body.to , req.body.title , req.body.text)

  res.status(201)
  res.json({status: 'Complete'})
}

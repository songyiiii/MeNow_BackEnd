import Twilio from 'twilio';
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const verifyServiceSid = process.env.VERIFYSERVICESID;
const client = Twilio(accountSid, authToken);
export const sendSms = async (req, res) => {
  try {
    const { phone, message } = req.body;
    const response = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: phone,
    });
    res.status(200).json({ result: true, message: 'SMS 전송 성공', response });
  } catch (error) {
    res.status(500).json({ result: false, message: 'SMS 전송 실패', error });
  }
};

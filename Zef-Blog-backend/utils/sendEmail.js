const nodeMailer = require("nodemailer");

module.exports = async (userEmail , subject , htmlTemplate) => {
  try {
    const transPorter = nodeMailer.createTransport({
      service : "gmail",
      auth : {
        user : process.env.APP_EMAIL_ADDRESS,
        pass : process.env.APP_EMAIL_PASSWORD,
      }
    });
    const mailOption = {
      from : process.env.APP_EMAIL_ADDRESS,
      to : userEmail,
      subject : subject,
      html : htmlTemplate
    }
    const info = await transPorter.sendMail(mailOption);
    console.log("email sent " + info.response);
  } catch (error) {
    throw new Error("internal server error (nodemailer)" )
  }
}
import { google } from "googleapis";

// Configure the OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: "v1", auth: oauth2Client });

const sendEmail = async (to, subject, message) => {
  try {
    const rawMessage = makeBody(to, subject, message);
    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: rawMessage,
      },
    });
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const makeBody = (to, subject, message) => {
  const str = [
    `To: ${to}`,
    "Content-type: text/html;charset=UTF-8",
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export default sendEmail;

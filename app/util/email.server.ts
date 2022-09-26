import mailjet from "node-mailjet";

const mailjetObject = new mailjet({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.SECRET_KEY
});

function textToHTML(senderName:string, emailBody: string): string {
  return `
    <h3>From ${senderName} through miltondavid.com</h3>
    <p>${emailBody}</p>
  `;
};

export function composeEmail(senderName: string, textPart: string) {
  const recipient = process.env.EMAIL_RECIPIENT as string;
  const sender = process.env.EMAIL_SENDER as string;
  const htmlPart = textToHTML(senderName, textPart);
  const emailData = {
    Messages: [
      {
        From: {
          Email: "sender"
        },
        To: [
          {
            Email: recipient
          }
        ],
        Subject: "From miltondavid.com",
        TextPart: textPart,
        HTMLPart: htmlPart
      }
    ]
  };

  return emailData;
};

// Types are conflicting so screw that
export async function sendEmail(emailData: any) {
  let result = false;
  mailjetObject.post("send", { version: "v3.1"}).request(emailData)
    .then(() => {
      result = true;
    })
    .catch(() => {
      result = false;
    });
  return result;
};

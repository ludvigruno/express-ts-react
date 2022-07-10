import nodemailer, { SentMessageInfo } from 'nodemailer';

const transporter: nodemailer.Transporter<SentMessageInfo> =
  nodemailer.createTransport({
    host: String(process.env.SMTP_HOST),
    port: Number(process.env.SMTP_PORT),
    secure: false,
    userAuth: {
      user: String(process.env.SMTP_USER),
      pass: String(process.env.SMTP_PASSWORD),
    },
  });
console.log(transporter);
/*
Сделать логику на случай если письмо уже отправленно на почту
*/
export const sendVerefiedMail = async (to: string, link: string) => {
  await transporter.sendMail({
    from: String(process.env.SMTP_HOST_USER),
    to,
    subject: `Активация аккаунта ${String(process.env.API_URL)}`,
    text: '',
    html: `
       <div>
            <h1>Для активации аккаунта перейдите по ссылке:</h1>
            <a href="${link}">${link}</a>
       </div>
    `,
  });
};

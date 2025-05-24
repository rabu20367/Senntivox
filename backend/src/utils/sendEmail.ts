import nodemailer from 'nodemailer';
import pug from 'pug';
import { htmlToText } from 'html-to-text';

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data?: Record<string, any>;
}

// Create email transporter
const createTransporter = () => {
  if (process.env.NODE_ENV === 'development') {
    // Use ethereal.email for development
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS,
      },
    });
  }

  // Use real email service for production
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Generate HTML based on a pug template
const generateHTML = (template: string, data: Record<string, any> = {}) => {
  const templatePath = `${__dirname}/../views/emails/${template}.pug`;
  return pug.renderFile(templatePath, data);
};

// Send the actual email
export default async ({ email, subject, template, data = {} }: EmailOptions) => {
  // 1) Render HTML based on a pug template
  const html = generateHTML(template, data);

  // 2) Define email options
  const mailOptions = {
    from: `Sentivox <${process.env.EMAIL_FROM || 'noreply@sentivox.com'}>`,
    to: email,
    subject,
    html,
    text: htmlToText(html),
  };

  // 3) Create a transport and send email
  const transporter = createTransporter();
  await transporter.sendMail(mailOptions);
};

// For sending simple text emails (like password reset)
export const sendSimpleEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: `Sentivox <${process.env.EMAIL_FROM || 'noreply@sentivox.com'}>`,
    to,
    subject,
    text,
  };

  const transporter = createTransporter();
  await transporter.sendMail(mailOptions);
};

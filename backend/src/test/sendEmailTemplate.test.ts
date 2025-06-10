import { describe, it, expect, jest } from '@jest/globals';

// use the real implementation of sendEmail
const { default: realSendEmail } = jest.requireActual('../utils/sendEmail');

// Mock nodemailer to avoid actually sending emails
import nodemailer from 'nodemailer';

const sendMailMock = jest.fn().mockResolvedValue(undefined);
(jest.spyOn(nodemailer, 'createTransport') as any).mockReturnValue({ sendMail: sendMailMock });

describe('sendEmail utility', () => {
  it('loads pug template without throwing', async () => {
    await expect(
      realSendEmail({
        email: 'test@example.com',
        subject: 'Test',
        template: 'resetPassword',
        data: { name: 'Tester', resetLink: 'http://example.com/reset' },
      })
    ).resolves.not.toThrow();
    expect(sendMailMock).toHaveBeenCalled();
  });
});

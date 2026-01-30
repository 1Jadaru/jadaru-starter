import { Resend } from "resend";

/**
 * Email Service
 * 
 * Setup:
 * 1. Create account at https://resend.com
 * 2. Add RESEND_API_KEY to environment variables
 * 3. Verify your sending domain
 * 
 * Usage:
 * ```ts
 * await sendWelcomeEmail({ to: "user@example.com", name: "John" });
 * ```
 */

const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender - update with your verified domain
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@example.com";
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "App";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email using Resend
 */
export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    // eslint-disable-next-line no-console
    console.warn("[Email] RESEND_API_KEY not set, skipping email send");
    return { success: false, error: "Email not configured" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      text,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error("[Email] Failed to send:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[Email] Error:", error);
    return { success: false, error: "Failed to send email" };
  }
}

/**
 * Welcome Email
 */
export async function sendWelcomeEmail({
  to,
  name,
}: {
  to: string;
  name: string;
}) {
  return sendEmail({
    to,
    subject: `Welcome to ${APP_NAME}!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a1a;">Welcome to ${APP_NAME}!</h1>
          <p>Hi ${name},</p>
          <p>Thanks for signing up! We're excited to have you on board.</p>
          <p>Here are a few things you can do to get started:</p>
          <ul>
            <li>Complete your profile</li>
            <li>Explore the dashboard</li>
            <li>Check out our documentation</li>
          </ul>
          <p>If you have any questions, just reply to this email.</p>
          <p>Best,<br>The ${APP_NAME} Team</p>
        </body>
      </html>
    `,
    text: `Welcome to ${APP_NAME}!\n\nHi ${name},\n\nThanks for signing up! We're excited to have you on board.\n\nBest,\nThe ${APP_NAME} Team`,
  });
}

/**
 * Password Reset Email
 */
export async function sendPasswordResetEmail({
  to,
  resetUrl,
}: {
  to: string;
  resetUrl: string;
}) {
  return sendEmail({
    to,
    subject: `Reset your ${APP_NAME} password`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a1a;">Reset Your Password</h1>
          <p>We received a request to reset your password.</p>
          <p>Click the button below to create a new password:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
          </p>
          <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #999; font-size: 12px;">If the button doesn't work, copy and paste this URL: ${resetUrl}</p>
        </body>
      </html>
    `,
    text: `Reset Your Password\n\nWe received a request to reset your password.\n\nClick here to reset: ${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this, you can safely ignore this email.`,
  });
}

/**
 * Email Verification
 */
export async function sendVerificationEmail({
  to,
  verifyUrl,
}: {
  to: string;
  verifyUrl: string;
}) {
  return sendEmail({
    to,
    subject: `Verify your ${APP_NAME} email`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a1a;">Verify Your Email</h1>
          <p>Thanks for signing up! Please verify your email address.</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${verifyUrl}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Verify Email</a>
          </p>
          <p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #999; font-size: 12px;">If the button doesn't work, copy and paste this URL: ${verifyUrl}</p>
        </body>
      </html>
    `,
    text: `Verify Your Email\n\nThanks for signing up! Please verify your email address.\n\nClick here to verify: ${verifyUrl}\n\nThis link will expire in 24 hours.`,
  });
}

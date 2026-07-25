const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const otpHTML = (username, otp) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #333;">Email Verification</h2>

      <p>Hi <strong>${username}</strong>,</p>

      <p>Your One-Time Password (OTP) for email verification is:</p>

      <div style="text-align: center; margin: 20px 0;">
        <h1 style="letter-spacing: 8px; color: #2563eb;">
          ${otp}
        </h1>
      </div>

      <p>This OTP is valid for <strong>10 minutes</strong>.</p>

      <p>If you didn't request this, you can safely ignore this email.</p>

      <hr />

      <p style="font-size: 12px; color: #777;">
        This is an automated email. Please do not reply.
      </p>
    </div>
  `;
};

export { generateOTP, otpHTML };
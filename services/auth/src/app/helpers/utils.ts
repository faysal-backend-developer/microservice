export const generateCode = (): string => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return randomNumber.toString();
}

export const getVerificationEmailHTML = (name: string, code: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #4A90E2;">Welcome to Microservice ECommerce, ${name}!</h2>
      <p>Thank you for creating an account with us.</p>
      <p>Please use the following verification code to complete your registration:</p>

      <div style="font-size: 24px; font-weight: bold; background-color: #f4f4f4; padding: 10px 20px; border-radius: 5px; display: inline-block;">
        ${code}
      </div>

      <p style="margin-top: 20px;">This code is valid for the next 2 hours.</p>
      <p>If you did not request this, you can safely ignore this email.</p>

      <hr style="margin-top: 30px; border: none; border-top: 1px solid #ccc;" />
      <p style="font-size: 12px; color: #888;">© ${new Date().getFullYear()} Microservice e-commerce. All rights reserved.</p>
    </div>
  `;
};


export const getAccountActivatedEmailHTML = (name: string): string => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <h2 style="color: #4A90E2;">Hi ${name}, your account is now active! 🎉</h2>

    <p>Thank you for verifying your email address. Your account has been successfully activated and is now ready to use.</p>

    <p>You can now log in and start exploring all the features available to you.</p>

    <a href="https://yourapp.com/login" style="display: inline-block; margin-top: 20px; padding: 12px 20px; background-color: #4A90E2; color: #fff; text-decoration: none; border-radius: 5px;">Log In to Your Account</a>

    <p style="margin-top: 30px;">If you did not create this account, please contact our support team immediately.</p>

    <hr style="margin-top: 30px; border: none; border-top: 1px solid #ccc;" />
    <p style="font-size: 12px; color: #888;">© ${new Date().getFullYear()} E-commerce. All rights reserved.</p>
  </div>
  `;
};


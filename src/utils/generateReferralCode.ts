import crypto from 'crypto';

export const generateReferralCode = (email: string) => {
  const secret = process.env.HASH_SECRET!; 
  const hash = crypto
    .createHmac('sha256', secret)
    .update(email)
    .digest('hex');

  return hash.substring(0, 8).toUpperCase(); // Return first 8 characters in uppercase
};
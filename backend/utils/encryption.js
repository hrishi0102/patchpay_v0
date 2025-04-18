// utils/encryption.js
const crypto = require('crypto');

// Encrypt sensitive data like API keys
const encryptData = (text) => {
  if (!process.env.ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY environment variable not set');
  }
  
  const iv = crypto.randomBytes(16);
  // Make sure the key is exactly 32 bytes (256 bits)
  const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted
  };
};

// Decrypt sensitive data like API keys
const decryptData = (encryptedObj) => {
  if (!process.env.ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY environment variable not set');
  }
  
  // Make sure the key is exactly 32 bytes (256 bits)
  const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);
  const iv = Buffer.from(encryptedObj.iv, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  
  let decrypted = decipher.update(encryptedObj.encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};

module.exports = {
  encryptData,
  decryptData
};
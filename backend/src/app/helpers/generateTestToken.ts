import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Generate a test token for development and testing purposes
 * This should NOT be used in production
 */
const generateTestToken = (): string => {
  const secret = process.env.SECRET_ACCESS_TOKEN;
  
  if (!secret) {
    console.error('Error: SECRET_ACCESS_TOKEN is not defined in .env file');
    process.exit(1);
  }
  
  console.log(`Using secret for token generation: ${secret.substring(0, 5)}...`);
  
  // Create a test user payload
  const payload = {
    id: 'test-user-id',
    email: 'test@example.com',
    role: 'admin',
    // Add any other claims you need for testing
  };
  
  // Generate the token
  const token = jwt.sign(payload, secret, { expiresIn: '1d' });
  
  console.log('Test Token Generated:');
  console.log('-------------------');
  console.log(token);
  console.log('-------------------');
  console.log('Use this token in your Authorization header:');
  console.log(`Authorization: Bearer ${token}`);
  
  return token;
};

// If this file is run directly, generate a token
if (require.main === module) {
  generateTestToken();
}

export default generateTestToken; 
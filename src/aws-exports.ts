// src/aws-config.ts
export const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'ap-south-1_kDdiq9Pl1', // e.g., 'us-east-1_abcdefg'
      userPoolClientId: '6qdictt0atl0flu3ecv16dfrd3', // e.g., '1234567890abcdefg'
      region: 'ap-south-1',
      storage: 'session', // e.g., 'us-east-1'
      // Optional: if you're using Cognito Identity Pool
      // Removed OAuth configuration to ensure no redirects
    },
  },
};

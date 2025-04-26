import fetch from 'node-fetch';
import dotenv from 'dotenv';
import generateTestToken from './generateTestToken';

dotenv.config();

// Hardcoded token for testing - replace with your actual token
const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QtdXNlci1pZCIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NTYwMzExMiwiZXhwIjoxNzQ1Njg5NTEyfQ.DzAFf3dDwM2LWQx9rJouwh8QrzgaS4PFiinybP2xFzI';

/**
 * Test the GraphQL API with a token
 */
const testGraphQL = async (query: string, variables = {}, token?: string): Promise<any> => {
  // Use provided token, hardcoded test token, or generate a new one
  const authToken = token || TEST_TOKEN || generateTestToken() as any;
  
  try {
    const response = await fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    
    const data = await response.json();
    
    console.log('GraphQL Response:');
    console.log('----------------');
    console.log(JSON.stringify(data, null, 2));
    
    return data;
  } catch (error) {
    console.error('Error testing GraphQL API:', error);
    throw error;
  }
};

// Example query to test the node query
const exampleQuery = `
  query GetNode($nodeId: ID!) {
    node(nodeId: $nodeId) {
      _id
      name
      description
      createdAt
      updatedAt
      root
      trigger {
        _id
        name
        description
      }
      responses {
        _id
        name
        description
        platforms {
          integrationId
          build
          localeGroups {
            localeGroupId
            variations {
              name
              responses
            }
          }
        }
      }
      actions {
        _id
        name
        description
      }
    }
  }
`;

// Example variables
const exampleVariables = {
  nodeId: '6296be3470a0c1052f89cccb', // Use an ID from your node.json data
};

// If this file is run directly, run the example query
if (require.main === module) {
  testGraphQL(exampleQuery, exampleVariables)
    .then(() => console.log('Test completed'))
    .catch(err => console.error('Test failed:', err));
}

export default testGraphQL; 
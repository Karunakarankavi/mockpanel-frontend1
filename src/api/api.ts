// src/api/api.ts

import { 
  CognitoUserPool, 
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID!, 
  ClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID!, 
};

const userPool = new CognitoUserPool(poolData);

// Signup function
export const signupUser = async (payload: { email: string; password: string;  }) => {
  const attributeList = [
    new CognitoUserAttribute({ Name: "email", Value: payload.email }),
  ];

  return new Promise((resolve, reject) => {
    userPool.signUp(payload.email, payload.password, attributeList, [], (err, result) => {
      if (err) return reject(err.message || err);
      resolve(result);
    });
  });
};

// Confirm signup (OTP verification) function
export const confirmSignup = async (email: string, code: string) => {
  const userData = {
    Username: email,
    Pool: userPool
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) return reject(err.message || err);
      resolve(result); // returns "SUCCESS" on success
    });
  });
};

// SRP Sign-in function
export const signInUser = async (email: string, password: string) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  const userData = {
    Username: email,
    Pool: userPool
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        // Tokens
        const accessToken = result.getAccessToken().getJwtToken();
        const idToken = result.getIdToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();
        resolve({ accessToken, idToken, refreshToken });
      },
      onFailure: (err) => {
        reject(err.message || err);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // handle if new password is required
        reject("New password required");
      }
    });
  });
};

export default userPool;

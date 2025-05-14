// token

import jwt from "jsonwebtoken";

// token
export const tokenGenerator = async (payload) => {
  const token = await jwt.sign(payload, "process.env.JWT_SECRET");
  return token;
};

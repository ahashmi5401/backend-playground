import jwt from "jsonwebtoken";

const assignJWT = (payload, exp) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: exp,
  });
};

export { assignJWT };
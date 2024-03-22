import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secrete = process.env.JWT_SECRETE;

function createToken(user) {
  const payload = {
    name:user.fullname,
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileimageurl,
    role: user.role,
  };
  const token = JWT.sign(payload, secrete);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secrete);
  return payload;
}

export { validateToken, createToken };

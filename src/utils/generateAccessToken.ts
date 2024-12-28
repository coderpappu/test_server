import jwt from "jsonwebtoken";
// genarate access token
// expires in 20 sec
const generateAccessToken = (id: String) => {
  const JWT_SECRET = process.env.JWT_ACCESS_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateAccessToken;

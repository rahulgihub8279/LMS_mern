import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "not authorized" });
    }
    let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(400).json({ message: "authentication failed" });
    } 
    req.userId = verifyToken.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid or expired token" });
  }
};

export default isAuth;


import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;   // Bearer eyJhbGciOiJIU....................

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1]; // ["Bearer", "eyJhbGciOiJIU.............."]

    if (!token) {
      return res.status(401).json({
        message: "Token missing",
      });
    }

    const decoded = jwt.verify(     // Checks the JWT and gives back its payload if valid
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;
    console.log("payload....",req.user);
    

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;



// jwt.verify() checks several things
// 1. Was the token signed with your secret?
// 2. Has the token expired?
// 3. If valid, it gives you the payload back(means whatever inside the payload part when u create the token.)
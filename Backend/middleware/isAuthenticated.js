import jwt from "jsonwebtoken";


const authenticateToken = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies); // 👈 ADD
    const token = req.cookies.token;

    if (!token) {
      console.log("❌ No token found");
      return res.status(401).json({
        message: "No token provided",
        success: false
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded token:", decoded);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("❌ Auth error:", error.message);
    return res.status(401).json({
      message: "Authentication failed",
      success: false
    });
  }
};
export default authenticateToken;
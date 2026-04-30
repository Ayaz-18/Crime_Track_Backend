import jwt from "jsonwebtoken";

const auth_user = (req, res, next) => {

  let token = req.cookies.token;

  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log("Token from cookie:", req.cookies.token); // Debugging line to check token from cookie
  console.log("Token from header:", req.headers.authorization); // Debugging line to check token from header
  if (!token) {
    return res.status(401).json({
      msg: "Unauthorized"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    console.log(error);

    return res.status(401).json({
      msg: "Invalid token"
    });
  }
};

export default auth_user;
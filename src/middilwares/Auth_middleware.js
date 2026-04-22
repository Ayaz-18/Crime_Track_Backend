import jwt from "jsonwebtoken";

const auth_user = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            msg: "Unauthorized"
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;   // or decoded.hash_email

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            msg: "Invalid token"
        });
    }
};

export default auth_user;
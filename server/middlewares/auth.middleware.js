import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if(!authHeader?.startsWith('Bearer ')) return res.status(403).send("Access Denied");

        const token = authHeader.split(' ')[1];

        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;

        next();    // going to next middleware
    } catch(err){
        res.status(500).json({ error: err.message});
    }
}

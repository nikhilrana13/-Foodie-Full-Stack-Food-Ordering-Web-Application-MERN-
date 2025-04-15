import jwt from "jsonwebtoken";


export const AdminisAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded.id
        next();
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"});
    }
    
};

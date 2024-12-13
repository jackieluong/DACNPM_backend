const jwt = require("jsonwebtoken");
require("dotenv").config();
function auth(req, res, next) {
    const white_lists = ['/', '/login', '/register'];

    const url = '/' + req.originalUrl.split('/')[3];
    
    if(white_lists.includes(url)){
        console.log('enter white_lists');
        return next();
    }


  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    

    // verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
        }
        // console.log("check token: ", token, "\nCheck decoded: ", decoded);
        // console.log("User:",req.user);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Expired/Invalid Token",
          });
    }

    
  } else {
    // return exception
    return res.status(401).json({
      message: "Unauthorized: No Access Token",
    });
  }
  
}

module.exports = auth;

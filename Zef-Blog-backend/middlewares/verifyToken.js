const jwt = require("jsonwebtoken");


function verifyToken (req, res, next) {
  const autToken = req.headers.authorization
  if (autToken){
    const token = autToken.split(" ")[1];
  
  try {
    const decodedPayload = jwt.verify(token , process.env.JWT_SECRET_KEY);
    req.user = decodedPayload;
    next();
  } catch (error) {
    res.status(401).json({message : "invalid token provided"})
  }

  } else {
    res.status(401).json({message : "no token provided"})
  }
}


function verifyTokenAndAdmin (req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      
      return res.status(403).json({message : "you must be admin to access this route"})
    }
  
  });
}

function verifyTokenAndOnlyUser (req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      
      return res.status(403).json({message : "only logged in user is allowed to access this route"})
    }
  
  });
}


module.exports = {verifyToken , verifyTokenAndAdmin , verifyTokenAndOnlyUser};
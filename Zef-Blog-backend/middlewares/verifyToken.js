const jwt = require("jsonwebtoken");

// Verify Token
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

// Verify Token & Admin
function verifyTokenAndAdmin (req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      
      return res.status(403).json({message : "you must be admin to access this route"})
    }
  
  });
}


// Verify Token & Only User Himself
function verifyTokenAndOnlyUser (req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      
      return res.status(403).json({message : "only logged in user is allowed to access this route"})
    }
  
  });
}

// Verify Token & Authorization
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      
      return res.status(403).json({message : "only logged in user or Admin are allowed to access this route"})
    }
  
  });
}

function verifyTokenUserNotAdmin (req, res, next) {
  const autToken = req.headers.authorization
  if (autToken){
    const token = autToken.split(" ")[1];
  
  try {
    const decodedPayload = jwt.verify(token , process.env.JWT_SECRET_KEY);
    req.user = decodedPayload;
    if (!req.user.isAdmin){
      next();
    } else {
      return res.status(403).json({message : "not allowed admin to access this route"})
    }
  } catch (error) {
    res.status(401).json({message : "invalid token provided"})
  }

  } else {
    res.status(401).json({message : "no token provided"})
  }
}



module.exports = {verifyToken , verifyTokenAndAdmin , verifyTokenAndOnlyUser , verifyTokenAndAuthorization , verifyTokenUserNotAdmin};
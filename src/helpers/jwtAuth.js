const jwtHandler = require('./jwtHandler');

exports.jwtAuth = (req, res, next) => {
    const token = req.headers['bb-token'];
    if(token && jwtHandler.verify(token)){
        console.log(jwtHandler.verify(token))
        res.locals.udata = jwtHandler.decode(token)
        next()
    }
    else return res.status(401).json({message: "Token invalid! or Expired!"});
    
}
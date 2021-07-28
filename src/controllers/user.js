const { requestHandler } = require("../helpers/requestHandler");

const userProcess = require("../process/user");
let process = new userProcess();

exports.userLogin = async (req, res, next) => {
  requestHandler(req, res, next, async () => {
    return await process.login(req);
  });
};

exports.userRegister = (req, res, next) => {
  requestHandler(req, res, next, async () => {
    try{
      const { name, email, password } = await req.body;
      if(!req.file) res.status(500).json({message:"Image must be uploaded"})
      else{
        const image = await req.file.path;
        const uniqueString = randString();
        return await process.register({ name, email, password, image, uniqueString });
      }
    }catch(error){
      next(error)
    }
  });
};

exports.userVerify = async (req, res, next) => {
  const { userId } = req.params;

  requestHandler(req, res, next, async () => {
    return await process.verify(userId);
  });
};

exports.emailVerify = async (req, res, next) => {
  const { uniqueString } = req.params;

  requestHandler(req, res, next, async () => {
    return await process.emailVerify(uniqueString);
  });
};

exports.userReject = async (req, res, next) => {
  const { userId } = await req.params;

  requestHandler(req, res, next, async (body) => {
    return await process.reject(body, userId);
  });
};

const randString = () => {
  const len = 8
  let randStr = ''

  for(let i = 0; i<len; i++){
    const ch =Math.floor((Math.random()*10)+1)
    randStr += ch
  }
  return randStr
}
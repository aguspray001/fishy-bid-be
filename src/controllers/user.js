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
    const { name, email, password } = await req.body;
    const image = await req.file.path;
    // console.log(req)
    return await process.register({ name, email, password, image });
  });
};

exports.userVerify = async (req, res, next) => {
  const { userId } = req.params;

  requestHandler(req, res, next, async () => {
    return await process.verify(userId);
  });
};

exports.userReject = async (req, res, next) => {
  const { userId } = await req.params;

  requestHandler(req, res, next, async (body) => {
    return await process.reject(body, userId);
  });
};

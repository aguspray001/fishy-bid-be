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

const { sign } = require("../helpers/jwtHandler");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const userSchema = require("../models/user");
const { errorMessage } = require("../helpers/errorMessage");
const { sendEmailVerification } = require("../helpers/emailVerification");

class userProcess {
  async login(req) {
    let user = await userSchema.findOne({ email: req.body.email });

    if (user) {
      let checkPassword = await bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (checkPassword) {
        const data = user._doc; // copy and add verified status if image is exist
        const token = sign(data);
        return { data: token };
      } else {
        errorMessage("User not Found or Wrong Password!", 404);
      }
    } else {
      errorMessage("User not Found or Check your email!", 404);
    }
  }
  async register(data) {
    const checkUser = await userSchema.findOne({ email: data.email });
    if (!checkUser) {
      const resp = await userSchema.create(data);
      sendEmailVerification(data.email, data.uniqueString)
      return { data: resp };
    }
    if (checkUser) {
      errorMessage("Email has been registered!", 500);
    }
  }
  async verify(userId) {
    await userSchema
      .findByIdAndUpdate(userId, { verifyCode: 1, verifyReason: "" })
      .then((r) => {
        if (r) {
          return r;
        }
      })
      .catch((er) => {
        if (er) {
          errorMessage("User with params id not found!", 404);
        }
      });
  }
  async emailVerify(uniqueString) {
    const user = await userSchema.findOne({ uniqueString: uniqueString });
    if (user) {
      user.isValidEmail = 1;
      await user.save();
      console.log(user)
      return {data:user}
    } else {
      errorMessage("Email with params id not found!", 404);
    }
  }
  async reject(body, userId) {
    let reason = await this.reasonConvert(parseInt(body.reason_code));

    await userSchema
      .findByIdAndUpdate(userId, { verifyCode: 2, verifyReason: reason })
      .then((r) => {
        if (r) {
          return r;
        }
      })
      .catch((er) => {
        if (er) {
          errorMessage("User with params id not found!", 404);
        }
      });
  }

  reasonConvert(reason) {
    switch (reason) {
      case 1:
        return "Foto Buram atau Tidak Jelas";
      case 2:
        return "Nama Tidak Sesuai dengan KTP / Kartu Identitas";
      default:
        return "";
    }
  }
}

module.exports = userProcess;

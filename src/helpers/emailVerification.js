const nodemailer = require("nodemailer");

exports.sendEmailVerification = async (email, uniqueString)=>{
    const Transport = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'aguspray001@gmail.com',
            pass: 'noprofile'
        }
    });

    const mailOptions = {
        from:'aguspray001@gmail.com',
        to : email,
        subject : 'Email verification',
        html : `Press <a href=http://localhost:3333/email-verify/${uniqueString}> here </a> to verify your email. thanks`
    }

    Transport.sendMail(mailOptions, (err, res)=>{
        if(err){
            console.log("error",err)
            // res.send("Email could not sent due to error: "+err);
            // const e = new Error()
            // e.message = "Something error when verif email!";
            // e.name = "Email verification error!";
            // e.errorStatus = 500;
            // throw e; //throw untuk membuang error, return untuk data
        }else{
            console.log("sukses",res)
            // res.send("Email has been sent successfully");
        }
    })
}
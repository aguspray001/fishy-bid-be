const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

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

    await ejs.renderFile(path.join(__dirname, "../views/emailVerif.ejs"), {code : uniqueString, api : `http://localhost:3333/api/v1/user/email-verify/${uniqueString}`}, async (err, data)=>{
        if(err) console.log(err)
        else{
            const mailOptions = {
                from:'aguspray001@gmail.com',
                to : email,
                subject : 'Email verification',
                html : data,
                text: data
            }
        
            Transport.sendMail(mailOptions, (err, res)=>{
                if(err){
                    console.log("error",err)
                }else{
                    console.log("sukses",res)
                }
            })
        }
    })
    
}
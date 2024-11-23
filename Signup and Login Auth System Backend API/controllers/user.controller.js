import userModel from "../models/user.model.js";
import nodemailer from 'nodemailer';
const signup = async (req, res)=>{
    try {
        const {name, username, password, email, phone} = req.body;
        const user = await userModel.create({name, username, password, email, phone});
        //TODO: Send verification email
        const emailSent = await sendVerificationMail(user.email);
        if(emailSent){
            res.status(200).json({success: "User Creation is Successfull and email sent!"});
        }
        else{
            res.status(500).json({error: "Cannot create user account and email not sent!"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Cannot create user account!"});
    }
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

const sendVerificationMail = async (emailId)=>{
    try {
        console.log('Sending email to ', emailId);
        await transporter.sendMail({
            to: emailId,
            subject: "Email Verification Link from Our Backend",
            html:`
                <body>
                    <h1>Verification Link</h1>
                    <a href='http://localhost:3000/api/v1/user/verify?email=${emailId}'>Click Here</a>
                </body>
            `
        })
        console.log('Email sent successfully');
        return true;
    } catch (error) {
        console.log('Error in sending email',error);
        return false;
    }
}

const login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const emailExists = await userModel.findOne({email});
        if(emailExists){
            if(emailExists.verficationStatus===true){
                const passwordMatch = await userModel.findOne({email, password});
                if(passwordMatch){
                    console.log('Login is Successfull');
                    res.status(200).json({success: "Login is Successfull!", user: emailExists});
                }
                else{
                    console.log('Wrong Password');
                    res.status(400).json({error: "Wrong Password!"});
                }
            }
        }
        else{
            console.log('User does not exist');
            res.status(404).json({error: "User does not exist!"});
        }
    } catch (error) {
        console.log('Error in login',error);
    }
}

const verfiyUser = async (req, res)=>{
    try {
        const {email} = req.query;
        const emailExists = await userModel.findOne({email});
        if(emailExists){
            if(emailExists.verficationStatus===true){
                console.log('User is already verified');
                res.status(200).json({success: "User is already verified!"});
            }
            else{
                emailExists.verficationStatus = true;
                await emailExists.save();
                console.log('User is verified');
                res.status(200).json({success: "User is verified!"});
            }
        }
        else{
            console.log('User does not exist');
            res.status(404).json({error: "User does not exist!"});
        }
    } catch (error) {
        
    }
}

export {signup, login, verfiyUser};
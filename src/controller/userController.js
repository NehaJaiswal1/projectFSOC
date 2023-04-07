
const userModel = require('../model/userModel')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const validation = require("../validations/validation")

const register = async function(req, res){
  try {
    let userData = req.body;

    let { name, email,  password, tags, role} = userData;

    if (Object.keys(userData).length == 0)
      return res.status(400).send({ status: false, message: "please provide required fields" });

    if (!name)
      return res.status(400).send({ status: false, message: " name is mandatory" });

    if (typeof name != "string")
      return res.status(400).send({ status: false, message: " name should be in string" });

    // regex
    name = userData.name = name.trim();

    if (name == "")
      return res.status(400).send({ status: false, message: "Please Enter name value" });

    if (!validation.validateName(name))
      return res.status(400).send({ status: false, message: "please provide valid name " });

    //================================ email ======

    if (!email)
      return res.status(400).send({ status: false, message: "email is mandatory" });

    if (typeof email != "string")
      return res.status(400).send({ status: false, message: "email id  should be in string" });

    //=========== email =======

    email = userData.email = email.trim().toLowerCase()
    if (email == "")
      return res.status(400).send({ status: false, message: "Please enter email value" });

    if (!validation.validateEmail(email))
      return res.status(400).send({ status: false, message: "Please provide valid email id" });


    //========= password ======

    if (!password)
      return res.status(400).send({ status: false, message: "password is mandatory" });

    if (typeof password != "string")
      return res.status(400).send({ status: false, message: "please provide password in string " });

    password = userData.password = password.trim();
    if (password == "")
      return res.status(400).send({ status: false, message: "Please provide password value" });


    //regex password
    if (!validation.validatePassword(password))
      return res.status(400).send({ status: false, message: "8-12 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });

    //Encrypting password
    let hashing = bcrypt.hashSync(password, 10);
    userData.password = hashing;

    if (!tags)
      return res.status(400).send({ status: false, message: "tags is mandatory" });

    if (typeof tags != "string")
      return res.status(400).send({ status: false, message: "please provide tags in string " });

    tags = userData.tags = tags.trim();
    if (tags == "")
      return res.status(400).send({ status: false, message: "Please provide tags value" });
    if (!role)
      return res.status(400).send({ status: false, message: "role is mandatory" });

    if (typeof role != "string")
      return res.status(400).send({ status: false, message: "please provide role in string " });

    role = userData.role = role.trim();
    if (role == "")
      return res.status(400).send({ status: false, message: "Please provide role " });


    
    const userExist = await userModel.findOne({email: email});

    if (userExist) {
      if (userExist.email == email)
        return res.status(400).send({ status: false, message: "email id  already exist" });

    }
    const userCreated = await userModel.create(userData);

    return res.status(201).send({ status: true, message: "User created successfully", data: userCreated });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ status: false, message: error.message });
  }
};

const loginUser = async function(req, res){
    try {
      let data = req.body;
      let { email, password } = data;
  
      if (Object.keys(data).length == 0)
        return res.status(400).send({ status: false, message: "Please send data" });
  
      if (!email)
        return res.status(400).send({ status: false, message: "Please enter Emaill" });
  
  
      if (email != undefined && typeof email != "string")
        return res.status(400).send({ status: false, message: "Please enter Emaill in string format" });
  
      email = data.email = email.trim();
      if (email == "")
        return res.status(400).send({ status: false, message: "Please enter Email value" });
  
      if (!validation.validateEmail(email))
        return res.status(400).send({ status: false, message: "Please enter valid Email" });
  
      if (!password)
        return res.status(400).send({ status: false, message: "Please enter password" });
  
      if (password != undefined && typeof password != "string")
        return res.status(400).send({ status: false, message: "Please enter password in string format" });
  
      password = data.password = password.trim();
  
      if (password == "")
        return res.status(400).send({ status: false, message: "Please enter password" });
  
      if (!validation.validatePassword(password))
        return res.status(400).send({ status: false, message: "Please enter valid password" });
  
      //       
  
      let isUserExist = await userModel.findOne({ email: email });
  
      if (!isUserExist)
        return res.status(404).send({ status: false, message: "No user found with given Email", });
      //Decrypt
      let passwordCompare = await bcrypt.compare(password, isUserExist.password);
  
      if (!passwordCompare) return res.status(400).send({ status: false, message: "Please enter valid password" })
  
      let token = jwt.sign(
        { userId: isUserExist._id, exp: Math.floor(Date.now() / 1000) + 86400 },
        "project5"
      );
  
      let tokenInfo = { userId: isUserExist._id, token: token };
  
      res.setHeader('x-api-key', token)
  
      return res.status(200).send({ status: true, message: "User login successfull", data: tokenInfo });
  
    } catch (err) {
      return res.status(500).send({ status: false, error: err.message });
    }
};

const getUser = async function(req, res){
    try {
      let userId = req.params.userId
  
      if (!mongoose.isValidObjectId(userId))
        return res.status(400).send({ status: false, message: "Please provide valid userId" })
  
      if (userId != req.userId) {
        return res.status(403).send({ status: false, message: "UserId in params and in token do not match" })
      }
  
      let userData = await userModel.findById(userId)
  
      if (!userData) { return res.status(404).send({ status: false, message: "User is not found" }) }
  
      return res.status(200).send({ status: true, message: "User profile details", data: userData })
    }
    catch (err) {
      return res.status(500).send({ status: false, error: err.message });
    }
}
  
const UpdateUser = async function (req, res){
    try {
      const userId = req.params.userId
      let userData = req.body
      let { name, email} = userData
  
      if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).send({ status: false, message: "Please provide valid userId" })
      }
  
      if (Object.keys(userData).length !== 0) {
        let checkEmpty = Object.keys(userData)
        for (i of checkEmpty) {
          if (userData[i].trim() == "")
            return res.status(400).send({ status: false, message: `${i} value can not be Empty` })
        }
      }
  
      if (Object.keys(userData).length == 0) {
        return res.status(400).send({ status: false, message: "Please provide some data to update" })
      }

     
      if (name) {
        if (typeof name != "string")
          return res.status(400).send({ status: false, message: "first name should be in string" });
  
        name = userData.name = name.trim();
  
        if (name == "") return res.status(400).send({ status: false, message: "Please Enter first name value" });
  
        if (!validation.validateName(name))
          return res.status(400).send({ status: false, message: "please provide valid first name " });
      }
  
      // ================================ email 
      let userExist;
      if (email) {
  
        if (typeof (email) != "string") return res.status(400).send({ status: false, message: "Please provide email in string" })
  
        email = userData.email = email.trim().toLowerCase()
        if (email == "") return res.status(400).send({ status: false, message: "Please provide value of email" })
  
        if (!validation.validateEmail(email))
          return res.status(400).send({ status: false, message: "Please enter valid Email" });
  
        userExist = await userModel.findOne({email: email })
  
        if (userExist) {
          if (userExist.email == email)
            return res.status(400).send({ status: false, message: "Email is already exists, please send another Email" })
        }
      }
  
      
      const updatedUser = await userModel.findByIdAndUpdate({ _id: userId },
        {
          $set: { name: name,  email: email},
        }, { new: true });
  
      return res.status(200).send({ status: true, message: "User profile updated", data: updatedUser })
  
    } catch (error) {
      return res.status(500).send({ status: false, data: error.message })
    }
}

const forgetPassword = async function(req,res){
    let userId= req.params.userId;
    let userData = req.body;
    let {email,question,answer} = userData;
    if(Object.keys(userData).length == 0) return res.status(400).send({status:false, message:"provide valid Information"});

    if (email==undefined) return res.status(400).send({ status: false, message: "Please provide email" })
    if (!email) return res.status(400).send({ status: false, message: "Please provide email" })
    if (validation.validateEmail(email.trim()) == false) return res.status(400).send({ status: false, message: "Please provide valid email" })
    
    if (question==undefined) return res.status(400).send({ status: false, message: "Please write question" })
    if (!question) return res.status(400).send({ status: false, message: "Please write question" })

    if (answer==undefined) return res.status(400).send({ status: false, message: "Please write answer" })
    if (!answer) return res.status(400).send({ status: false, message: "Please write answer" })

    let user = await userModel.findById(userId);
    if(!user) return res.status(404).send({status:false, message:"No match found"});

    if(user.answer != answer) return res.status(400).send({status:false, message:"Invalid answer"});
    return res.status(200).send({status:false, message:"you can Reset Password"});
}

const resetPassword = async function(req,res){
    let userId = req.params.userId;
    let userData = req.body;
    let {newPassword , confirmPassword} = userData;
    if(Object.keys(userData).length ==0) return res.status(400).send({status:false, message:"provide New Password"});

    if (newPassword==undefined) return res.status(400).send({ status: false, message: "Please provide New Password" })
    if (!newPassword) return res.status(400).send({ status: false, message: "Please provide New Password" })

    if (confirmPassword==undefined) return res.status(400).send({ status: false, message: "Please provide Confirm Password" })
    if (!confirmPassword) return res.status(400).send({ status: false, message: "Please provide Confirm Password" })

    if(newPassword != confirmPassword) return res.status(400).send({status: false, message:"Both passwords must match"});

    let hashing = bcrypt.hashSync(newPassword, 10);
    userData.newPassword = hashing;

    await userModel.findByIdAndUpdate({_id:userId}, {$set:{password:userData.newPassword}},{new:true});
    return res.status(200).send({status: true , message: "password changed successfully"});
}

const deleteUser = async function (req, res){
  try {
      const userId = req.params.userId

      if (!isValidObjectId(userId))
          return res.status(400).send({ status: false, message: "invlaid object Id " })

      let checkUser = await userModel.findById(userId)

      if (!checkUser)
          return res.status(404).send({ status: false, message: "No user found with this ID" })

      if (checkUser.isDeleted == true)
          return res.status(400).send({ status: false, message: "User already deleted" })

      let deletedata = await productModel.findOneAndUpdate({ _id: userId, isDeleted: false },
          { $set: { isDeleted: true, deletedAt: Date.now() } })

      return res.status(200).send({ status: true, message: "success", message: "deleted successfully " })

  } catch (err) {
      return res.status(500).send({ status: false, message: err.message })
  }
}


module.exports = { loginUser, register, getUser, UpdateUser, forgetPassword, resetPassword, deleteUser}
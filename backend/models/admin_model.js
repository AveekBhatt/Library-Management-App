const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    fullname :{
       type : String,
       required : true
     },
     email : {
        type : String,
        required : true
     },
     password : {
        type : String,
        required : true,
        minlength: 8, // enforce min length
        validate: {
        validator: function (value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value);
      },
      message:
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
      },
     },
    confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password; 
      },
      message: "Passwords do not match.",
    },
  },
  
  usertype : {
      type : String ,
      default : "admintype"
   }
});

adminSchema.pre("save" , async function(next){
     if(!this.isModified("password")){
        return next();
     }
     try{
         const salt = await bcrypt.genSalt(10);
         this.password = await bcrypt.hash(this.password,salt);
         next();
     }catch(error){
        next(error)
     }
}) 

adminSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model("Admin", adminSchema);
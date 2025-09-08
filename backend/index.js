require("dotenv").config();

const bcrypt = require("bcrypt");
const config = require("./config.json");
const mongoose = require('mongoose');

mongoose.connect(config.connectionstring)

const express = require("express");
const cors = require("cors");
const app = express();

const User = require("./models/user_model");
const Admin = require("./models/admin_model");
const Book = require("./models/book_model");
const jwt = require("jsonwebtoken");
const  {authenticateToken}  = require('./utilities')

app.use(express.json());
app.use(
    cors({
        "origin" : "*",
    })
)

app.post("/signup" , async(req,res) =>{
    const {fullname , email , password , confirmPassword} = req.body;
    const isUser = await User.findOne({email:email});
    if(isUser){
        return res.json({
            message : "User Already Exists"
        })
    }
    if (password !== confirmPassword) {
       return res.json({ error: true, message: "Passwords do not match" });
    }

    const user = new User({
        fullname : fullname,
        email : email,
        password : password,
        confirmPassword : confirmPassword
    })

    await user.save();
    const accesstoken = jwt.sign({user} , process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : "36000m",
    })
    return res.json({
        error : false,
        user,
        accesstoken,
        message: 'Registration Successful'
    });
})
app.post("/login" , async(req,res)=>{
    const {email , password} = req.body;
    try{
        const userInfo = await User.findOne({email : email});
        if(!userInfo){
           return res.json({
              message : "User Does not exists"
           })
        }
        const isMatch = await bcrypt.compare(password,userInfo.password);
        if(!isMatch){
            return res.status(400).json({
                error : true,
                message : "Incorrect Password"
            })
        }
        const user = { user: userInfo };
        const accesstoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error: false,
            message: "Login Successful",
            email,
            accesstoken
        });

    }catch(error){
        return res.status(400).json({
            error : true,
            message : "Inavalid ERROR"
        })
    }
})

app.post("/user-post-book" , authenticateToken , async(req,res)=>{
    
      const { user } = req.user;
      if(user.usertype=="admintype"){
          return res.status(401).json({
             message : "Unauthourized"
          })
      }
      let {ISBN , title , subtitle , author , published , publisher , pages , description , status} = req.body;
      ISBN = Number(ISBN)
      pages = Number(pages)      
      console.log({ISBN , title , subtitle , author , published , publisher , pages , description , status})
      try{
          const bookinfo = await Book.findOne({ISBN : ISBN});
          if(bookinfo){
            return res.json({
                message : "Book Already Exists"
            })
          }
          const book = new Book({
              ISBN,
              title,
              subtitle,
              author,
              published,
              publisher,
              pages,
              description,
              status
          })
          await book.save();
          return res.json({
             error : false,
             book
          })
      }catch(error){
         return res.json({
            error : "Not Possible"
         })
      }
})

app.post("/post-book" , authenticateToken , async(req,res)=>{
      const { user } = req.user;
      if(user.usertype=="usertype"){
          return res.status(401).json({
             message : "Unauthourized"
          })
      }
      const {ISBN , title , subtitle , author , published , publisher , pages , description , status} = req.body;
      try{
          const bookinfo = await Book.findOne({ISBN : ISBN});
          if(bookinfo){
            return res.json({
                message : "Book Already Exists"
            })
          }
          const book = new Book({
              ISBN,
              title,
              subtitle,
              author,
              published,
              publisher,
              pages,
              description,
              status
          })
          await book.save();
          return res.json({
             error : false,
             book
          })
      }catch(error){
         return res.json({
            error : "Not Possible"
         })
      }
})
app.get("/fetch-book" , authenticateToken , async(req,res)=>{
    const {user} = req.user;
    console.log(user)
    if(user.usertype=="admintype"){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }
    try{
       const books = await Book.find({status : "Available"});
       return res.json({
       error: false,
       books
    });
    }catch(error){
       return res.json({
            error : "Not Possible"
        })
    }
})
app.put("/borrowbook/:bookId" , authenticateToken , async(req,res)=>{
    const bookId = req.params.bookId
    const {user} = req.user;
    if(user.usertype=="admintype"){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }
    try{
       let book = await Book.find({status : "Available" , _id: bookId});
       if(!book){
          return res.status(400).json({
             error: true,
             message : "Not Available"
          });
       }
       book[0].status="Borrowed";
       book[0].borrower = user.email
       console.log(book)
       await book[0].save();
       return res.status(400).json({
       error: false,
       book
    });
    }catch(error){
       return res.json({
            error : "Not Possible"
        })
    }
})
app.put("/returnbook/:bookId" , authenticateToken , async(req,res)=>{
    const bookId = req.params.bookId
    const {user} = req.user;
    if(user.usertype=="admintype"){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }
    try{
       const book = await Book.find({status : "Borrowed" , _id: bookId , borrower : user.email});
       if(!book){
          return res.status(400).json({
             error: true,
             message : "Not Available"
          });
       }
       book[0].status="Available"
       book[0].borrower = "admintype"
       await book[0].save()
       return res.status(400).json({
       error: false,
       book
    });
    }catch(error){
       return res.json({
            error : "Not Possible"
        })
    }
})

app.get("/showborrowed" , authenticateToken , async(req,res)=>{ 
    const {user} = req.user;
    if(user.usertype=="admintype"){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }
    try{
        const books = await Book.find({status : "Borrowed" ,  borrower : user.email});
        if(!books){
            return res.json({
                message : "No book is borrowed by you"
            })
        }
        return res.json({
            error : false,
            books
        })
    }catch(error){
        return res.json({
            message : "Error Found"
        })
    }
})



app.get("/dashboard" , authenticateToken , async(req,res)=>{
    const {user} = req.user;
    console.log(user)
    if(user.usertype=="usertype"){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }
    try{
       const books = await Book.find();
       return res.status(400).json({
       error: false,
       books
    });
    }catch(error){
       return res.json({
            error : "Not Possible"
        })
    }
})
app.put("/Adminborrowbook/:bookId" , authenticateToken , async(req,res)=>{
    const bookId = req.params.bookId
    const {user} = req.user;
    if(user.usertype=="usertype"){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }
    try{
       const book = await Book.find({status : "Available" , _id: bookId});
       if(!book){
          return res.status(400).json({
             error: true,
             message : "Not Available"
          });
       }
       book[0].status="Borrowed";
       console.log(book)
       await book[0].save();
       return res.status(400).json({
       error: false,
       book
    });
    }catch(error){
       return res.json({
            error : "Not Possible"
        })
    }
})
app.put("/Adminreturnbook/:bookId" , authenticateToken , async(req,res)=>{
    const bookId = req.params.bookId
    const {user} = req.user;
    if(user.usertype=="usertype"){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }
    try{
       const book = await Book.find({status : "Borrowed" , _id: bookId});
       if(!book){
          return res.status(400).json({
             error: true,
             message : "Not Available"
          });
       }
       book[0].status="Available"
       await book[0].save();
       return res.status(400).json({
       error: false,
       book
    });
    }catch(error){
       return res.json({
            error : "Not Possible"
        })
    }
})
app.delete("/Admindeletebook/:bookId",  authenticateToken , async(req,res)=>{
    const bookId = req.params.bookId;
    console.log(bookId)
    try{
        const book = await Book.findOne({_id: bookId});
        if(!book){
            return res.status(400).json({
                error : true,
                message : "Book Does not exists"
            })
        }
        await Book.deleteOne({_id:bookId});
        console.log("DDD")
        return res.json({
            error : false ,
            message : "Book Deleted"
        })
    }catch(error){
        return res.status(400).json({
            error : true ,
            message : "Error Occured"
        })
    }
})

app.post("/Adminlogin" , async(req,res)=>{
    const {email , password} = req.body;
    try{
        const AdminInfo = await Admin.findOne({email : email});
        if(!AdminInfo){
           return res.json({
              message : "User Does not exists"
           })
        }
        const isMatch = await bcrypt.compare(password,AdminInfo.password);
        if(!isMatch){
            return res.status(400).json({
                error : true,
                message : "Incorrect Password"
            })
        }
        const user = { user: AdminInfo };
        const accesstoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error: false,
            message: "Login Successful",
            email,
            accesstoken
        });

    }catch(error){
        return res.status(400).json({
            error : true,
            message : "Inavalid ERROR"
        })
    }
})
app.post("/adminsignup" , async(req,res) =>{
    const {fullname , email , password , confirmPassword} = req.body;
    const isAdmin = await Admin.findOne({email:email});
    if(isAdmin){
        return res.json({
            message : "User Already Exists"
        })
    }
    if (password !== confirmPassword) {
       return res.json({ error: true, message: "Passwords do not match" });
    }

    const admin = new Admin({
        fullname : fullname,
        email : email,
        password : password,
        confirmPassword : confirmPassword
    })

    await admin.save();
    const accesstoken = jwt.sign({admin} , process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : "36000m",
    })
    return res.json({
        error : false,
        admin,
        accesstoken,
        message: 'Registration Successfull'
    });
})
app.get("/getuserinfo" , authenticateToken , async(req,res)=>{
    const {user} = req.user;
    console.log(user)
    const isUser = await User.findOne({_id : user._id});
    console.log(user)

    if(!isUser){
        return res.status(400).json({
            message : "User Does Not Exists"
        })
    }
    return res.json({
        error : false,
        user : {fullname : isUser.fullname , email : isUser.email}
    })
})
app.get("/getadmininfo" , authenticateToken , async(req,res)=>{
    const {user} = req.user;
    console.log(user)
    const isUser = await Admin.findOne({_id : user._id});
    console.log(user)

    if(!isUser){
        return res.status(400).json({
            message : "User Does Not Exists"
        })
    }
    return res.json({
        error : false,
        user : {fullname : isUser.fullname , email : isUser.email}
    })
})

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
app.get("/search-note" , authenticateToken , async(req,res) => {
    const {user} = req.user;
    let {query} = req.query;
    console.log(query)
    if(!query){
        return res.status(400).json({
            error : true,
            message : "Search Query is Required"
        })
    } 
    console.log("QUERY :  " +  query)
    const regex = new RegExp(escapeRegex(query), "i");
    try{
        const matchingBooks = await Book.find({
            $or:[
                 { title: { $regex: regex } },
                 { author: { $regex: regex } }
            ]
        })
        
        return res.json({
            error : false,
            books : matchingBooks,
            message : "Notes Matched Successfully"
        })

    }catch(error){
        return res.status(400).json({
            error : true,
            message : "Interval Server Error"
        })
    }
})

app.get("/search-note-borrow" , authenticateToken , async(req,res) => {
    const {user} = req.user;
    let {query} = req.query;
    console.log(query)
    if(!query){
        return res.status(400).json({
            error : true,
            message : "Search Query is Required"
        })
    } 
    const regex = new RegExp(escapeRegex(query), "i");
    try{
        const matchingBooks = await Book.find({
            borrower : user.email,
            $or:[
                 { title: { $regex: regex } },
                 { author: { $regex: regex } }
            ]
        })
        
        return res.json({
            error : false,
            books : matchingBooks,
            message : "Notes Matched Successfully"
        })

    }catch(error){
        return res.status(400).json({
            error : true,
            message : "Interval Server Error"
        })
    }
})

app.listen(3000);
module.exports = app;
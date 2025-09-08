app.post("/user-post-book" , authenticateToken , async(req,res)=>{
      const { user } = req.user;
      if(user.usertype=="admintype"){
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
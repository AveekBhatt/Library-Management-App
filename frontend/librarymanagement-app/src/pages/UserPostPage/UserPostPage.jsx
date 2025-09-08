import React, { useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import UserPost from "../UserPost/UserPost";
import { useNavigate } from "react-router-dom";

const UserPostPage = () =>{
     const navigate = useNavigate()
     useEffect(()=>{
              const token = localStorage.getItem("token");
              if (!token) {
               navigate("/login");  
              return;
             }
              return () => {};
      } ,[]);
    return(
     <>
     <UserPost />
     </>
    )
}

export default UserPostPage

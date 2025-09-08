import React, { useEffect } from "react";
import AdminPost from "../AdminPost/AdminPost";

const AdminHome = () =>{
     useEffect(()=>{
              const token = localStorage.getItem("token");
              if (!token) {
               navigate("/login");  
              return;
            }
              showbooks();
              return () => {};
            } ,[]);
    return(
        <>
        <AdminPost />
        </>
    )
}

export default AdminHome;
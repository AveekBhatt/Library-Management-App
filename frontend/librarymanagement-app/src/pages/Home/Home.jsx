import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import BookTestImg from "../../assets/book-engineering-svgrepo-com.svg"
import { useNavigate } from "react-router-dom";

const Home = () =>{
      const navigate = useNavigate();
      const [books , setbooks] = useState([])
      const [error , seterror] = useState("");
      const showbooks = async() =>{
         try{
            const response = await axiosInstance.get("/fetch-book");
            console.log(response.data)
            setbooks(response.data.books)
         }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                    seterror(error.response.data.message);
                }
                else{
                    seterror("An unexpected error occured")
                }
           }
      }
      
      const borrowabook = async(bookId) =>{
         try{
            const response = await axiosInstance.put("/borrowbook/" + bookId);
            if(response.data){
               showbooks();
            }
         }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                    seterror(error.response.data.message);
                }
                else{
                    seterror("An unexpected error occured")
                }
           }
      }
      const onSearchnote = async(query) =>{
            try{
               const response = await axiosInstance.get("/search-note",{
                 params :{query}
               })
               console.log(response)
            if(response.data && response.data.books){
                setbooks(response.data.books)
             }
            }catch(error){
              console.log(error);
            }
         }
      const handleclearnote = () =>{
         showbooks();
        }
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
        <Navbar onSearchnote={onSearchnote}  handleclearnote={handleclearnote}/>
         <div className="grid grid-cols-3 gap-6 mt-20 mx-auto max-w-6xl px-4">
              {books.map((item,index) => (
              <div 
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
              key={item._id || index} >
                <a href="#">
                  <img
                    className="p-8 rounded-t-lg"
                    src={BookTestImg}
                    alt="product"
                  />
                </a>
                <div className="px-5 pb-5">
                    <h5 className="text-xl mb-5 ml-5 font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.title}
                    </h5>
                 <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
                   <div className="p-5 flex-1">
                    <h6 className="text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-100">
                     {item.description}
                    </h6>
                 </div>
                  <div className="flex items-center justify-between px-5 pb-5">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Available</span>
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => borrowabook(item._id)}>
                   Borrow
                  </button>
                  </div>
                 </div>
                 </div>
              </div>
              ))}
            </div>

        </>
    )
}

export default Home;
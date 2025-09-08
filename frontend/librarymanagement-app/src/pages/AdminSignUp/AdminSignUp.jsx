import React from "react";
import { ValidateEmail , ValidatePassword } from "../../utils/helper";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
const AdminSignUp = () =>{
    const navigate = useNavigate();
    const [name , setname] = useState("");
    const [error , seterror] = useState(null);
    const [email , setemail] = useState("");
    const [password , setpassword] = useState("");
    const [confirmPassword , setconfirmPassword] = useState("");
    const handleSignUp = async(e) =>{
        e.preventDefault();
        if(!String(name)){
             seterror("Please Enter A Valid Name");
             return;
        }
        if(!ValidateEmail(email)){
            seterror("Please Enter A Valid Email");
            return;
        }
        if(!ValidatePassword(password)){
          seterror("Password is too Weak");
          return ;
        }
        if(confirmPassword!==password){
           seterror("Password does not match");
           return ;  
        }
        seterror("");
        try{
            const response = await axiosInstance.post("/adminsignup",{
                fullname : name,
                email : email ,
                password : password ,
                confirmPassword : confirmPassword
            })
            console.log(response)
            if(response.data && response.data.error){
                seterror(response.data.message)
            }
            if(response.data && response.data.accesstoken){
                localStorage.setItem("token" , response.data.accesstoken);
                navigate('/AdminHome')
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
    
    return(
        <>
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Admin Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSignUp}>
                  <div>
                      <label for="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                      <input 
                       type="text" 
                       name="fullname" 
                       id="fullname" 
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Brendon" required=""
                       value={name}
                       onChange={(e) => setname(e.target.value)}
                       />
                  </div>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input 
                       type="email" 
                       name="email" 
                       id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                       value={email}
                       onChange={(e) => setemail(e.target.value)}
                       />
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input 
                       type="password" 
                       name="password" 
                       id="password" 
                       placeholder="••••••••" 
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                       value={password}
                       onChange={(e) => setpassword(e.target.value)}
                       />
                  </div>
                  <div>
                      <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input 
                       type="password" 
                       name="confirm-password" 
                       id="confirm-password" 
                       placeholder="••••••••" 
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                       value={confirmPassword}
                       onChange={(e)=> setconfirmPassword(e.target.value)}
                       />
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="/AdminLogin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
        </>
    )
}
export default AdminSignUp;
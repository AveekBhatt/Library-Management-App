import React from "react";
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import Home from "./pages/Home/Home"
import BookCardBorrowed from "./BookCardBorrowed/BookCardBorrowed"
import MyBooks from "./pages/Home/MyBooks";
import AdminSignUp from "./pages/AdminSignUp/AdminSignUp";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminPost from "./pages/AdminPost/AdminPost";
import AdminHome from "./pages/Home/AdminHome";
import UserPostPage from "./pages/UserPostPage/UserPostPage";
const routes = (
   <Router>
      <Routes>
        <Route path="/login" exact element={<Login/>}></Route>
        <Route path="/signUp" exact element={<SignUp/>}></Route>
        <Route path="/Home" exact element={<Home/>}></Route>
        <Route path="/MyBooks" exact element={<MyBooks />}></Route>
        <Route path="/AdminSignUp" exact element={<AdminSignUp/>}></Route>
        <Route path="/AdminLogin" exact  element={<AdminLogin />}></Route>
        <Route path="/AdminPost" exact element={<AdminPost />}></Route>
        <Route path="/AdminHome" exact element={<AdminHome />}></Route>
        <Route path="/PostABook" exact element={<UserPostPage />}></Route>
      </Routes>
   </Router>
)

const App = () =>{
  return(
   
       <div>{routes}</div>
  )
}
export default App;
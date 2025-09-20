 import React, { useEffect } from 'react'
 import Navbar from './component/navbar/navbar'
 import Home from './component/home/Home'
 import Footer from './component/footer/Footer'
 import About from './component/about/About'
 import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './component/signup/Signup'
import SignIn from './component/signup/SignIn'
import Todo from './component/todo/Todo'
import { useDispatch } from "react-redux";
import { authActions } from './store'


 const App = () => {
  const dispatch=useDispatch();
  useEffect(() => {
    const id=sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login())
    }
  }, [])
   return (
     <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/todo' element={<Todo/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/signin' element={<SignIn/>} />
          </Routes>
        </Router>
         <Footer />
     </div>
   )
 }
 
 export default App

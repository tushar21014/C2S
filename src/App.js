import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import Home from './Components/Home';
import SignUp from './Components/Signup';
import Login from './Components/Login';
import UserPanel from './Screens/UserPanel';
import Viewpastuploads from './Screens/Viewpastuploads';
import MyProfile from './Screens/MyProfile';
import Forgotpassword from './Components/Forgotpassword';
import Resetpassword from './Components/Resetpassword';



function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<Home />}></Route>
      <Route exact path='/Signup' element={<SignUp />}></Route>
      <Route exact path='/Login' element={<Login />}></Route>
      <Route exact path='/UserPanel' element={<UserPanel />}></Route>
      <Route exact path='/Viewpastuploads' element={<Viewpastuploads />}></Route>
      <Route exact path='/MyProfile' element={<MyProfile />}></Route>
      <Route exact path='/Forgotpassword' element={<Forgotpassword />}></Route>
      <Route exact path='/Resetpassword/:id/:token' element={<Resetpassword />}></Route>
      
      </Routes>
    </Router>
  );
}

export default App;


import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import SignUp from './Components/SignUp';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path= "/" element = {<h1>Books listing Component</h1>} />
        <Route path= "/add" element = {<h1>Add user Component</h1>} />
        <Route path= "/dasboard" element = {<h1>update Book Component</h1>} />
        <Route path= "/logout" element = {<h1>logout Component</h1>} />
        </Route>
        <Route path= "/signup" element = {<SignUp/>} />
        <Route path= "/login" element = {<Login/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;

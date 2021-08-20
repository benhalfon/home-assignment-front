import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import UserProfilePage from "./components/UserProfilePage";
import { BrowserRouter, Route,Redirect } from 'react-router-dom'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Route exact path="/">
          <Redirect to="/index" />
        </Route>
        <Route exact path='/index' component={LoginPage}></Route>
        <Route path='/signup' component={RegisterPage}></Route>
        <Route path='/userProfilePage' component={UserProfilePage}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;

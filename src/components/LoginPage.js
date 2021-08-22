import ButtonLogin from './ButtonLogin'
import Header from './Header'
import {useState, useEffect} from 'react'
import Button from './Button'
// import AxiosHelper from '../rest/AxiosHelper'
import { Link,withRouter, Router } from 'react-router-dom';
import {IsEmailValid} from '../utils/validationUtils'
import swal from 'sweetalert';
var axios = require('axios');

var token = require('basic-auth-token');


function validate(email, password) {
    return {
      emailEmpty: {status: email.length === 0, title: "Email is empty!" , message: "Please enter an email address"} ,
      passwordEmpty: {status:password.length === 0, title: "Password is empty!",message: "Please enter password"} ,
      emailInvalid:  {status:!IsEmailValid(email),title: "Invalid email address",message: "Please enter valid an email address"}
    };
  }


function LoginPage({history}) {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const onLogin = (email,password) => {
        console.log('email',email);
        console.log('password',password);

        const userToken = token(email,password)
        console.log('token',userToken);

        const validStatus = validate(email,password);

        for (const property in validStatus) {
            console.log(`${property}: ${validStatus[property]}`);
            if(validStatus[property].status === true){
                swal({
                    title: validStatus[property].title,
                    text: validStatus[property].message,
                    icon: "error",
                  });
                  return;
            }
        }

        var config = {
          method: 'get',
          url: `https://tranquil-peak-25178.herokuapp.com/users?email=`+email,
          headers: { 
            'Authorization': 'Basic '+userToken
          }
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          history.replace( {
                    pathname: '/userProfilePage',
                    search: '?token='+userToken+'&id='+response.data.id
                  });
        })
        .catch(function (error) {
          console.log(error);
        });
        


    }

    const resetData = () => {
        setEmail('');
        setPassword('');
    }

    return (
        <div className="container">
      
                <div className='form-control'>
                    <Header title="Log in"></Header>
                    <label>Email</label>
                    <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder='Email' value={email} required onChange={(e) => setEmail(e.target.value)}></input>
                    <label>Password</label>
                    <input type="password" placeholder='Password' value={password} minLength='8' required onChange={(e) => setPassword(e.target.value)}></input>
                    <ButtonLogin onClick={() =>onLogin(email,password) }></ButtonLogin>
                    <Button onClick={() => resetData()} text="Reset"></Button>
                    <Link to="/signup">register</Link>
                </div>
        </div>
    )
}

export default withRouter(LoginPage)

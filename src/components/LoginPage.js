import ButtonLogin from './ButtonLogin'
import Header from './Header'
import {useState, useEffect} from 'react'
import Button from './Button'
import AxiosHelper from '../rest/AxiosHelper'
import { Link,withRouter, Router } from 'react-router-dom';

var token = require('basic-auth-token');


function LoginPage({history}) {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const onLogin = (email,password) => {
        console.log(email);
        console.log(password);
        console.log(token(email, password));


        AxiosHelper.get('http://localhost:8080/users/displayAll'
        ).then(res => {
              console.log('login', res.data);
              console.log('id', res.data[0].id);
              history.replace( {
                pathname: '/userProfilePage',
                search: '?id='+res.data[0].id
        });
          }).catch(function (error) {
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
                    <input type="text" placeholder='Email' value={email} required onChange={(e) => setEmail(e.target.value)}></input>
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

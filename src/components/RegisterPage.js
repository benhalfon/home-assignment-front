import ButtonRegister from './ButtonRegister'
import Header from './Header'
import {useState} from 'react'
import Button from './Button'
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import swal from 'sweetalert';

var axios = require('axios');

function RegisterPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] =  useState('')
    const [lastName, setLastName] =  useState('')
    const [address, setAddress] =  useState('')
    const [birthDate, setBirthDate] =  useState('')

    const resetData = () => {
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setAddress('');
        setBirthDate('');
    }

    const onRegister = (email,password,firstName,lastName,address,birthDate)=>{
        var data = JSON.stringify({
            "email": email,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "birthDate": birthDate,
            "address": address
          });
          console.log(JSON.stringify(data));
        var config = {
            method: 'post',
            url: 'http://localhost:8080/users',
            headers: { 
              'accept': 'application/json', 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data)

            swal({
                title: "User created!",
                text: "you can login the system",
                icon: "success",
              });
            resetData();
          })
          .catch(function (error) {
            console.log(error);
          });

       
    }

    return (
        <div className="container">
      
            <div className='form-control'>
                    <Header title="Register"></Header>

                    <label>First name</label>
                    <input type="text" placeholder='First Name' value={firstName} required onChange={(e) => setFirstName(e.target.value)}></input>

                    <label>Last name</label>
                    <input type="text" placeholder='Last name' value={lastName} required onChange={(e) => setLastName(e.target.value)}></input>

                    <label>Address</label>
                    <input type="text" placeholder='Address' value={address} required onChange={(e) => setAddress(e.target.value)}></input>

                    <label>Birth date</label>
                    <input type="date" placeholder='Birth date' value={birthDate} required onChange={(e) => setBirthDate(e.target.value)}></input>

                    <label>Email</label>
                    <input type="text" placeholder='Email' value={email} required onChange={(e) => setEmail(e.target.value)}></input>

                    <label>Password</label>
                    <input type="password" placeholder='Password' value={password} minLength='8' required onChange={(e) => setPassword(e.target.value)}></input>

                    <ButtonRegister onClick={() =>onRegister(email,password,firstName,lastName,address,birthDate) }></ButtonRegister>
                    <Button onClick={() => resetData()} text="Reset"></Button>
                    <Link to="/index">login</Link>
                    
            </div>
        </div>
    )
}

export default RegisterPage

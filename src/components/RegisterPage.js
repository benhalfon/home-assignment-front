import ButtonRegister from './ButtonRegister'
import Header from './Header'
import {useState} from 'react'
import Button from './Button'
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import swal from 'sweetalert';
import {IsEmailValid,IsBirthDateValid} from '../utils/validationUtils'

var axios = require('axios');

function validate(email,password,firstName,lastName,address,birthDate) {
  return {
    emailEmpty: {status: email.length === 0, title: "Email is empty!" , message: "Please enter an email address"} ,
    passwordEmpty: {status:password.length === 0, title: "Password is empty!",message: "Please enter password"} ,
    emailInvalid:  {status:!IsEmailValid(email),title: "Invalid email address",message: "Please enter valid an email address"},
    firstNameEmpty: {status: firstName.length === 0, title: "First name is empty!" , message: "Please enter first name"},
    lastNameEmpty:  {status: lastName.length === 0, title: "Last name is empty!" , message: "Please enter last name"},
    addressEmpty:  {status: address.length === 0, title: "Address is empty!" , message: "Please enter address"},
    birthDateEmpty:  {status: birthDate.length === 0, title: "Birth date is empty!" , message: "Please enter birth date"},
    birthDateInvalid:  {status: !IsBirthDateValid(Date.parse(birthDate)), title: "Birth date is invalid!" , message: "Please enter the user birth date"},
  };
}

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

      const validStatus = validate(email,password,firstName,lastName,address,birthDate);
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
            url: `http://localhost:9090/users`,
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

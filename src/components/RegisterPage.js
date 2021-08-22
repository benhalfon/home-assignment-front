import ButtonRegister from './ButtonRegister'
import Header from './Header'
import {useState} from 'react'
import Button from './Button'
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import swal from '@sweetalert/with-react';
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

    const passwordAlert = ()=>{
      swal({
        text: "Password policy",
        icon: "info",
        buttons: {
          cancel: "Close",
        },
        content: 
        (
          <div> <ul>
          <li  className="passwordPolicyItem">password length between 8 to 30</li>
          <li  className="passwordPolicyItem">at least 1 uppercase character</li>
          <li  className="passwordPolicyItem">at least 1 digit</li>
          <li  className="passwordPolicyItem">numerical sequence less then 3</li>
          <li  className="passwordPolicyItem">alphabetical sequence less then 3</li>
          <li  className="passwordPolicyItem">qwerty sequence less then 3</li>
          <li  className="passwordPolicyItem">white space not allowed</li>
          </ul></div>
        )
      })
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
            url: `https://tranquil-peak-25178.herokuapp.com/users`,
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
            console.log('error',error);
            if(error.response.status){
              if(error.response.status==400){
                
                console.log('error.response.data',error.response.data);
                if(error.response.data.message.includes("Password policy error:")){
                  var errorMsg =error.response.data.message.split("Password policy error:")[1].split(',')
                  
                  
                  swal({
                    text: "Password policy error!",
                    icon: "error",
                    buttons: {
                      cancel: "Close",
                    },
                    content: 
                    (
                      <div>
                         <ul>
                            {errorMsg.map((item,index)=>{
                                return <li className="passwordPolicyItem">{item}</li>
                            })}
                        </ul>
                      </div>
                    )
                  })


                    }
                  }
            }

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
                    <button className="transparentArea" onClick={() => passwordAlert()}> <BsFillQuestionCircleFill onClick={() => passwordAlert()}></BsFillQuestionCircleFill> </button>
                    <input type="password" placeholder='Password' value={password} minLength='8' required onChange={(e) => setPassword(e.target.value)}></input>


                    <ButtonRegister onClick={() =>onRegister(email,password,firstName,lastName,address,birthDate) }></ButtonRegister>
                    <Button onClick={() => resetData()} text="Reset"></Button>
                    <Link to="/index">login</Link>
                    
            </div>
        </div>
    )
}

export default RegisterPage

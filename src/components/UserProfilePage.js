import Button from "./Button"
import {useState} from 'react'
import Header from './Header'
import AxiosHelper from '../rest/AxiosHelper'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
var axios = require('axios');


function UserProfilePage(props) {
    console.log('props',props)
    // const userInfo = localStorage.getItem('userInfo');
    console.log('props.location.search',    props.location.search.substring(1).split('=')[1])
    const userId = props.location.search.substring(1).split('=')[1];

    var config = {
        method: 'get',
        url: `http://localhost:8080/users?id=${userId}`
      };
      
      axios(config)
      .then(function (response) {
        console.log("init user",JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      




    const onSave = (email,password,firstName,lastName,address,birthDate)=>{
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
          
        //   axios(config)
        //   .then(function (response) {
        //     console.log(response.data)

        //     swal({
        //         title: "User created!",
        //         text: "you can login the system",
        //         icon: "success",
        //       });
        //     resetData();
            
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

       
    }


    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] =  useState('')
    const [lastName, setLastName] =  useState('')
    const [address, setAddress] =  useState('')
    const [birthDate, setBirthDate] =  useState('')

    //setEmail(userInfo.email)

    const resetData = () => {
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setAddress('');
        setBirthDate('');
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

                    <Button color='green' text='save' onClick={() =>onSave(email,password,firstName,lastName,address,birthDate) }></Button>
                    <Button onClick={() => resetData()} text="Reset"></Button>
                    <Link to="/">back</Link>
                    
            </div>
        </div>
    )
}


export default UserProfilePage


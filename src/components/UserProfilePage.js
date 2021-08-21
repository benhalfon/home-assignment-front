import Button from "./Button"
import {useState,useEffect} from 'react'
import Header from './Header'
import AxiosHelper from '../rest/AxiosHelper'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
var axios = require('axios');
var token = require('basic-auth-token');

var originData;

function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

function UserProfilePage(props) {
    console.log('props',props)
    // const userInfo = localStorage.getItem('userInfo');
    const queryObj = parseQuery(props.location.search)
    console.log('queryObj',queryObj);
    console.log('token',queryObj["token"]);

    

    useEffect(()=> {
      var config = {
        method: 'get',
        url: 'http://localhost:9090/users?id='+queryObj["id"],
        headers: { 
          'Authorization': 'Basic '+queryObj["token"] 
        }
      };
      axios(config)
      .then(function (response) {
          console.log('response user get:',JSON.stringify(response.data));
          setEmail(response.data.email);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setBirthDate(response.data.birthDate);
          setAddress(response.data.address);
          originData = response.data;
        })
      .catch(function (error) {
          console.log(error);
        });
    },[])

    




    const onSave = (id,email,firstName,lastName,address,birthDate)=>{
      console.log('id',id);
        var data = JSON.stringify({
            "email": email,
            "firstName": firstName,
            "lastName": lastName,
            "birthDate": birthDate,
            "address": address
          });
          console.log(JSON.stringify(data));
        var config = {
            method: 'put',
            url: `http://localhost:9090/users?id=`+id,
            headers: { 
              'accept': 'application/json', 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'Basic '+queryObj["token"]
            },
            data : data
          };


          axios(config)
          .then(function (response) {
            console.log('put result',JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });

          
        

       
    }


    

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] =  useState('')
    const [lastName, setLastName] =  useState('')
    const [address, setAddress] =  useState('')
    const [birthDate, setBirthDate] =  useState('')

    const resetData = () => {
        setEmail(originData.email);
        setFirstName(originData.firstName);
        setLastName(originData.lastName);
        setAddress(originData.address);
        setBirthDate(originData.birthDate);
    }

    return (
        <div className="container">
      
            <div className='form-control'>
                    <Header title={email}></Header>

                    <label>First name</label>
                    <input type="text" placeholder='First Name' value={firstName} required onChange={(e) => setFirstName(e.target.value)}></input>

                    <label>Last name</label>
                    <input type="text" placeholder='Last name' value={lastName} required onChange={(e) => setLastName(e.target.value)}></input>

                    <label>Address</label>
                    <input type="text" placeholder='Address' value={address} required onChange={(e) => setAddress(e.target.value)}></input>

                    <label>Birth date</label>
                    <input type="date" placeholder='Birth date' value={birthDate} required onChange={(e) => setBirthDate(e.target.value)}></input>

                   
            
                    <Button color='green' text='save' onClick={() =>onSave(originData.id,email,firstName,lastName,address,birthDate) }></Button>
                    <Button onClick={() => resetData()} text="Reset"></Button>
                    <Link to="/">back</Link>
                    
            </div>
        </div>
    )
}


export default UserProfilePage


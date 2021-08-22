import Button from "./Button"
import {useState,useEffect} from 'react'
import Header from './Header'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import {IsBirthDateValid} from '../utils/validationUtils'
var axios = require('axios');

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


function validate(firstName,lastName,address,birthDate) {
  return {
    firstNameEmpty: {status: firstName.length === 0, title: "First name is empty!" , message: "Please enter first name"},
    lastNameEmpty:  {status: lastName.length === 0, title: "Last name is empty!" , message: "Please enter last name"},
    addressEmpty:  {status: address.length === 0, title: "Address is empty!" , message: "Please enter address"},
    birthDateEmpty:  {status: birthDate.length === 0, title: "Birth date is empty!" , message: "Please enter birth date"},
    birthDateInvalid:  {status: !IsBirthDateValid(Date.parse(birthDate)), title: "Birth date is invalid!" , message: "Please enter the user birth date"},
  };
}


function UserProfilePage(props) {
    console.log('props',props)
    // const userInfo = localStorage.getItem('userInfo');
    const queryObj = parseQuery(props.location.search)
    console.log('queryObj',queryObj);
    console.log('token',queryObj["token"]);

    const [editorMode, setEditorMode] = useState(false);

    useEffect(()=> {
      var config = {
        method: 'get',
        url: 'https://tranquil-peak-25178.herokuapp.com/users?id='+queryObj["id"],
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

    


    const onEdit=()=>{
      setEditorMode(true);
    }

    const onSave = (id,email,firstName,lastName,address,birthDate)=>{
      console.log('id',id);

      const validStatus = validate(firstName,lastName,address,birthDate);

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
            "firstName": firstName,
            "lastName": lastName,
            "birthDate": birthDate,
            "address": address
          });
          console.log(JSON.stringify(data));
        var config = {
            method: 'put',
            url: `https://tranquil-peak-25178.herokuapp.com/users?id=`+id,
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
            response.data.birthDate=response.data.birthDate.split('T')[0];
            originData = response.data;
            setEditorMode(false);
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
                    <input type="text" placeholder='First Name' disabled={!editorMode} value={firstName} required onChange={(e) => setFirstName(e.target.value)}></input>

                    <label>Last name</label>
                    <input type="text" placeholder='Last name' value={lastName} disabled={!editorMode} required onChange={(e) => setLastName(e.target.value)}></input>

                    <label>Address</label>
                    <input type="text" placeholder='Address' value={address} disabled={!editorMode} required onChange={(e) => setAddress(e.target.value)}></input>

                    <label>Birth date</label>
                    <input type="date" placeholder='Birth date' value={birthDate} disabled={!editorMode} required onChange={(e) => setBirthDate(e.target.value)}></input>

                    {editorMode?
                    <div>
                    <Button color='green' text='Save' onClick={() =>onSave(originData.id,email,firstName,lastName,address,birthDate) }></Button>
                    <Button onClick={() => resetData()} text="Reset"></Button>
                    
                    <Link to="/">back</Link>
                    </div>
                    :
                    <div>
                    <Button color='purple' text='Edit' onClick={() =>onEdit()}></Button>
                    
                    <Link to="/">back</Link>
                    </div>
                    }
                   
                    
            </div>
        </div>
    )
}


export default UserProfilePage


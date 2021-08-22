import Button from "./Button"
import {useState,useEffect} from 'react'
import Header from './Header'
import { Link,withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import axios from "axios";

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }

function DisplayAllPage(props) {

    console.log('props',props)
    // const userInfo = localStorage.getItem('userInfo');
    const queryObj = parseQuery(props.location.search)
    console.log('queryObj',queryObj);
    console.log('token',queryObj["token"]);
    const [userData, setUsers] =  useState([])

    useEffect(()=> {
        var config = {
          method: 'get',
          url: 'https://tranquil-peak-25178.herokuapp.com/users/displayAll',
          headers: { 
            'Authorization': 'Basic '+queryObj["token"] 
          }
        };
        axios(config)
        .then(function (response) {
            console.log('response displayAll:',JSON.stringify(response.data));
            setUsers(response.data);
          })
        .catch(function (error) {
            console.log(error);
          });
      },[])

    return (
        <div className="bigContainer">
             {userData.map((data,id)=>{
                return <div className="task" key={id}>
                    <h2>[{data.id}] {data.email}</h2>
                    <h3>{data.firstName} {data.lastName}</h3>
                    <p>{data.birthDate} {data.address}</p>
                    </div>
            })}

            <Button text="Back to profile" color="blue" onClick={() =>{
            props.history.replace( {
            pathname: '/userProfilePage',
            search: '?token='+queryObj["token"]+'&id='+queryObj["id"]
            });
            } }></Button>

            <Button text="Exit" color='black' onClick={() =>{
            props.history.replace( {
            pathname: '/'
            });
            } }></Button>
       
        </div>
    )
}

export default withRouter(DisplayAllPage)

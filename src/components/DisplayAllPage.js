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
    const [userData, setUsers] =  useState({})

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
            userData.forEach((item)=> console.log('displayAll item',item.id))
          })
        .catch(function (error) {
            console.log(error);
          });
      },[])

    return (
        <div>
             {userData.map((data,id)=>{
                return <div key={id}>
                    <h2>{data.id}</h2>
                    <p>{data.email}</p>
                    </div>
            })}

            <Button onClick={() =>{
            props.history.replace( {
            pathname: '/userProfilePage',
            search: '?token='+queryObj["token"]+'&id='+queryObj["id"]
            });
            } }></Button>
        </div>
    )
}

export default withRouter(DisplayAllPage)

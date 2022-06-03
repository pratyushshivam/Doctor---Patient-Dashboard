import './Login.css';
import React from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import firebase from 'firebase';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { login } from '../redux/actions/actions'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import { loginUser } from '../../redux/actions/auth';
const LoginPage = () => {
    const [user, setUser] = React.useState('')
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(firebase.auth().currentUser.email)
            setUser(firebase.auth().currentUser.email)
        } else {
            // No user is signed in.
        }
    });
    const [age, setAge] = React.useState('');
    const appAuth = useSelector(({ auth }) => auth)
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const dispatch = useDispatch()
    let history = useHistory();

    React.useEffect(() => {
        if (appAuth.status) {
            history.push("/");
        }
    }, [appAuth.status])
    console.log('appAuth.status', appAuth.status)
    const submitHandler = () => {
         const data = dispatch(loginUser(email, password)).then((res)=>{
            if(!res.toString().includes('Error')){
                history.push("/");
            }
         })
         console.log('data', data);
        // console.log('data', data);
        console.log("Final data dispaly", appAuth)
    }
    return (
        <div className="loginPage">
            <div className="left-panel">
                <div className="left-panel-header">
                    <h1>Welcome to <span>Login System</span></h1>
                    <p>Please login to your account</p>
                </div>
                <div className="left-panel-form">
                    <TextField id="outlined-basic" onChange={(e) => { setEmail(e.target.value) }} label="Emal" type="email" variant="outlined" />
                    <TextField id="outlined-basic" label="Password" onChange={(e) => { setPassword(e.target.value) }} type="password" variant="outlined" />
                    <Button onClick={submitHandler} variant="contained">Submit</Button>
                </div>

            </div>
            <div className="right-panel">
            </div>
        </div>
    )
}

export default LoginPage;
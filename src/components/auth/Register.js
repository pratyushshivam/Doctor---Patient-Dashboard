import './Register.css';
import React from 'react'
import db, { auth, provider } from '../../firebase'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
// import { signUp } from '../redux/actions/actions'
import { useHistory } from "react-router-dom";
import { signUpUser } from '../../redux/actions/auth';
const SignupPage = () => {
    const appAuth = useSelector(({ auth }) => auth)
    const [type, setType] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const dispatch = useDispatch()
    let history = useHistory();
    const handleChange = (event) => {
        setType(event.target.value);
    };

    React.useEffect(()=>{
        const data = {
            email: email,
            phone: phone,
            type: type,
        }
        if(appAuth.status){
            db.collection("values").doc(`${email}`).set({
                value: data,
            }).then(()=>{
                console.log("Values successfully stored")
                if(type==="Doctor"){
                    history.push("/dashboard/doctor");
                }
                else if(type === "Patient"){
                    history.push("/dashboard/patient");
                }
            }).catch((error)=>{
                console.error("Error",error);
            })
        }
    },[appAuth.status])

    const submitHandler = () => {
        dispatch(signUpUser(email, password))
        localStorage.setItem('user', email);
        console.log("Final data dispaly",appAuth)
        history.push("/");
    }
    return (
        <div className="loginPage-signup">
            <div className="left-panel-signup">
                <div className="left-panel-header-signup">
                    <h1>Welcome to <span>Signup System</span></h1>
                    <p>Please create a new account</p>
                </div>
                <div className="left-panel-form-signup">
                    <TextField id="outlined-basic" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" label="Emal" variant="outlined" />
                    <TextField id="outlined-basic" value={phone} onChange={(e)=>{setPhone(e.target.value)}} label="Phone Number" type="number" variant="outlined" />
                    <TextField id="outlined-basic" value={password} onChange={(e)=>{setPassword(e.target.value)}} label="Password" type="password" variant="outlined" />
                    <Button onClick={submitHandler} variant="contained">Submit</Button>
                </div>

            </div>
            <div className="right-panel-signup">
            </div>
        </div>
    )
}

export default SignupPage;
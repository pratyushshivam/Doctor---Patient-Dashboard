import React from 'react'
import Navbar from '../layout/Navbar'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from "react-router-dom";
import db from '../../firebase';

export const  Donations = () => {
    const theme = createTheme();
    let history = useHistory();
    const [name, setName] = React.useState('')
    const [address1, setAddress1] = React.useState('')
    const [address2, setAddress2] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    function guidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    const handleSubmit = e => {
        console.log(name, address1, address2, phoneNumber);
        e.preventDefault();
        const donationInfo = {
          name,
          address1,
          address2,
          phoneNumber,
        }
        // store data to backend
        db.collection(`donations`).doc(`${guidGenerator()}`).set(donationInfo).then((res)=>{
          console.log("Values successfully stored")
          history.push('/')
        }).catch((res)=>{
          console.log(res.message);
        })
      };

  return (
    <div><Navbar backBtn="/doctors" title="Donations" bg="#e0fdf7" />
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LocalHospitalIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Donate a medicine
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Name of the medicine"
              name="text"
              onChange={(e)=>{setName(e.target.value)}}
            />
           <TextField
              margin="normal"
              fullWidth
              label="Address 1"
              name="text"
              onChange={(e)=>{setAddress1(e.target.value)}}
            />
              <TextField
              margin="normal"
              fullWidth
              label="Address 2"
              name="text"
              onChange={(e)=>{setAddress2(e.target.value)}}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Phone number"
              name="number"
              onChange={(e)=>{setPhoneNumber(e.target.value)}}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Donate
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    
    
    </div>
  )
}

export default Donations
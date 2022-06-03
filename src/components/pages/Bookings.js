import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAppointments } from '../../redux/actions/appointment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import firebase from 'firebase';

import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from '../layout/Navbar';
import BookingItem from '../BookingItem';
import db from '../../firebase';

const Bookings = ({ bookings, getAppointments }) => {
  const [user, setUser] = React.useState('')
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(firebase.auth().currentUser.email)
      setUser(firebase.auth().currentUser.email)
    } else {
      // No user is signed in.
    }
  });
  const [bookingData, setBookingData] = React.useState([])
  const [queryData, setQueryData] = React.useState([])
  let data = []
  React.useEffect(() => {
if(user){
  db.collection(user).get().then((querySnapshot) => {
    let demo = []
    setQueryData(querySnapshot);
    querySnapshot.docs.map(doc => {
      console.log('data;', doc.data())
      // setBookingData([])
      // data.push(doc.data())
      demo.push(doc.data())

    });
    setBookingData(demo);
  }, []);
}

    setBookingData(data);
  }, [user])

  console.log(queryData.docs);
  console.log('data', data);
  console.log('queryData', queryData)
  console.log('bookingData',bookingData);

  return (
    <div className="Bookings">
      <Navbar bg="#e0fdf7" title="Your Bookings" backBtn="/" />
      <div className="container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Doctor Name</TableCell>
            </TableRow>
          </TableHead>


          {bookingData.map((booking, index) => (
            <TableBody key={index}>
              <TableRow>
                <TableCell>{booking.dateTime}</TableCell>
                <TableCell>{booking.timeTime}</TableCell>
                <TableCell>{booking.reason}</TableCell>
                <TableCell>{booking.patientName}</TableCell>
                <TableCell>{booking.doctorName}</TableCell>
              </TableRow>

              {/* </tr> */}
            </TableBody>


          ))}
        </Table>
      </div>
    </div>
  );
};

Bookings.propTypes = {
  bookings: PropTypes.array,
  getAppointments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  bookings: state.appointment.appointments,
});

export default connect(mapStateToProps, { getAppointments })(Bookings);

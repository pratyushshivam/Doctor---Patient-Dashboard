import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import db, { auth, provider } from '../../firebase'
import Navbar from '../layout/Navbar';
import { useHistory } from "react-router-dom";

// import firebase from "firebase/app";
import { createAppointment } from '../../redux/actions/appointment';

const BookingForm = (props) => {
  let history = useHistory();

  const [user, setUser] = React.useState('')
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(firebase.auth().currentUser.email)
      setUser(firebase.auth().currentUser.email)
    } else {
      // No user is signed in.
    }
  });
  const { location } = props;
  const { doctor, date, time } = location.state;
  const { createAppointment} = props;
  // let user = localStorage.user
  const [formData, setFormData] = useState({
    patient: '',
    reason: '',
  });
  function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

  const { patient, reason } = formData;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {

    e.preventDefault();
    const appointmentInfo = {
      patient,
      reason,
      date,
      time,
      patient,
      doctor_name: doctor.name,
    }
    // store data to backend
    db.collection(`${user}`).doc(`${guidGenerator()}`).set({
      reason: reason,
      dateTime: date,
      timeTime: time,
      doctorName: doctor.name,
      patientName: patient
    }).then((res)=>{
      console.log("Values successfully stored")
      history.push("/");
    }).catch((res)=>{
      console.log(res.message);
    })
  };
  console.log(doctor);
  return (
    <div className="BookingForm">
      <Navbar title="Confirm Booking" bg="#e0fdf7" backBtn="/doctors" />
      <div className="detail">
        <h5 className="title">{`Dr ${doctor.name}`}</h5>
        <p className="category">{doctor.category}</p>
        <p className="address">{doctor.address}</p>
        <p className="date">{`${date} | ${time}`}</p>
      </div>
      <form onSubmit={e => handleSubmit(e)} className="container">
        <div className="form-field">
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user}
            disabled
          />
        </div>
        <div className="form-field">
          <label htmlFor="reason">Reason for visit</label>
          <input
            type="text"
            name="reason"
            id="reason"
            required
            value={reason}
            onChange={e => handleChange(e)}
            placeholder="Enter your reason for visit"
          />
        </div>
        <div className="form-field">
          <label htmlFor="patient">Patients name</label>
          <input
            type="text"
            name="patient"
            id="patient"
            required
            value={patient}
            onChange={e => handleChange(e)}
            placeholder="Enter patient's name"
          />
        </div>
        <input className="book-btn" type="submit" value="Confirm Booking" />
      </form>
    </div>
  );
};

BookingForm.propTypes = {
  user: PropTypes.object,
  createAppointment: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { createAppointment })(BookingForm);

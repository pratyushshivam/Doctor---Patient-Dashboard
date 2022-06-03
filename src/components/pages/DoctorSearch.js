import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { useHistory } from "react-router-dom";

import logo from '../../assets/images/logo.png';
import Navbar from '../layout/Navbar';
import Button from '@mui/material/Button';
import { setFilter } from '../../redux/actions/doctor';
import { auth } from '../../firebase';
// import { auth } from 'firebase';

const DoctorSearch = ({ categories, setFilter, history }) => {
  const [search, setSearch] = useState('');
  let historys = useHistory();


  const handleFilter = (id = null) => {
    const filterObj = {};
    // if (search !== '') {
      filterObj.name = search;
    // }
    // if (id !== 'All' && id) {
      filterObj.category = id;
    // }
    setFilter(filterObj);
    historys.push('/doctors');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilter();
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = ({ target: { id } }) => {
    handleFilter(id);
  };

  return (
    <div className="DoctorSearch">
      <Navbar title="Search Doctors" bg="#e0fdf7" />
      <Button onClick={()=>{history.push('/bookings')}}>My Bookings</Button>
      <Button onClick={()=>{auth.signOut().then((res)=>{console.log('user signed out');historys.push('/login')})}}>Logout</Button>
      <div className="container">
        <div><Button onClick={()=>{history.push('/donations')}}>Medicine Donations</Button></div>
        <div className="seard">
          <form onSubmit={e => handleSubmit(e)}>
                <TextField
                id="outlined-disabled"
                label="Search Doctors"
                value={search}
                style={{width:'230px'}}
                onChange={e => handleChange(e)}
                defaultValue="Hello World"
            />
          </form>
        </div>
        <div>
          <img className="logo" src={logo} alt="company logo" />
          <h1>Search Doctors</h1>
          <p>
            Search by directly typing the doctors name. You can also search by
            clicking one of the categories listed below.asd
          </p>
          <div className="container categories-dashboard">
            <div className="categories row">
              {categories.map(category => (
                <div key={category} className="col-6 col-md-4 mb-4 categories-main">
                  <Button
                    type="submit"
                    variant="outlined"
                    id={category}
                    onClick={e => handleClick(e)}
                    className="category-btn"
                  >
                    {category}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DoctorSearch.defaultProps = {
  categories: [
    'All',
    'General Doctor',
    'Mental Health',
    'Skin',
    'Child Care',
    'Women Health',
    'Dentist',
    'ENT',
    'Homeopathy',
    'Ayurveda',
    'Heart',
  ],
};

DoctorSearch.propTypes = {
  setFilter: PropTypes.func.isRequired,
  categories: PropTypes.array,
};

export default connect(null, { setFilter })(DoctorSearch);

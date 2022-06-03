import axios from 'axios';
import Qs from 'qs';
import { BASE_URL, DOCTORS } from '../../constants';
import {
  ADD_DOCTOR,
  GET_DOCTORS,
  GET_SINGLE_DOCTOR,
  DOCTOR_FILTER,
} from './types';
import { setAlert } from './alert';

export const addDoctor = (doctorObj) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${DOCTORS}`,
      {
        data: {
          attributes: { ...doctorObj },
        },
      },
      {
        withCredentials: true,
      },
    );

    dispatch({
      type: ADD_DOCTOR,
      action: response.data,
    });
    dispatch(setAlert('Doctor created Successfully', 'success'));
  } catch (error) {
    dispatch(setAlert(`${error}`, 'danger'));
  }
};

export const getDoctors = (filterObj = {}) => async (dispatch) => {
  console.log('filterObj', filterObj);
  try {
    const response = await axios.get(
      `${BASE_URL}${DOCTORS}`,
      {
        params: {
          filter: {
            ...filterObj,
          },
        },
        paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: 'brackets' }),
      },
      {
        withCredentials: true,
      },
    );

    const doctors = response.data.data.map(doc => ({ id: doc.id, ...doc.attributes }));
    console.log('doctods', doctors);
    //filter
      
    if(filterObj.category === "General Doctor"){
      let generalDoctors = []
      response.data.data.map((item, index)=> {
        console.log(item.attributes.category);
        if(item.attributes.category === "General Doctor") {
          generalDoctors.push(item.attributes);
        }
      })
      console.log('generalDoctors', generalDoctors);
      dispatch({
        type: GET_DOCTORS,
        payload: generalDoctors,
      });
    }
    else if(filterObj.category === "Mental Health") {
        let mentalHealth = []
        alert('mental health');
        response.data.data.map((item, index)=> {
          console.log(item.attributes.category);
          if(item.attributes.category === "Mental Health") {
            mentalHealth.push(item.attributes);
          }
        })
        console.log('mentalHealth', mentalHealth);
        dispatch({
          type: GET_DOCTORS,
          payload: mentalHealth,
        });
    }
    else if(filterObj.category === "Skin") {
        let skin = []
        response.data.data.map((item, index)=> {
          console.log(item.attributes.category);
          if(item.attributes.category === "Skin") {
            skin.push(item.attributes);
          }
        })
        console.log('skin', skin);
        dispatch({
          type: GET_DOCTORS,
          payload: skin,
        });
    }
    else if(filterObj.category === "Child Care") {
        let childCare = []
        response.data.data.map((item, index)=> {
          console.log(item.attributes.category);
          if(item.attributes.category === "Child Care") {
            childCare.push(item.attributes);
          }
        })
        console.log('Childcare', childCare);
        dispatch({
          type: GET_DOCTORS,
          payload: childCare,
        });
    }
    else if(filterObj.category === "Women Health") {
        let womenHealth = []
        response.data.data.map((item, index)=> {
          console.log(item.attributes.category);
          if(item.attributes.category === "Women Health") {
            womenHealth.push(item.attributes);
          }
        })
        console.log('womenHealth', womenHealth);
        dispatch({
          type: GET_DOCTORS,
          payload: womenHealth,
        });
    }
    else if(filterObj.category === "Dentist") {
        let dentist = []
        response.data.data.map((item, index)=> {
          console.log(item.attributes.category);
          if(item.attributes.category === "Dentist") {
            dentist.push(item.attributes);
          }
        })
        console.log('dentist', dentist);
        dispatch({
          type: GET_DOCTORS,
          payload: dentist,
        });
    }
    else if(filterObj.category === "ENT") {
        let ent = []
        response.data.data.map((item, index)=> {
          console.log(item.attributes.category);
          if(item.attributes.category === "ENT") {
            ent.push(item.attributes);
          }
        })
        console.log('ent', ent);
        dispatch({
          type: GET_DOCTORS,
          payload: ent,
        });
    }
    else if(filterObj.category === "Homeopathy") {
        let homeo = []
        response.data.data.map((item, index)=> {
          console.log(item.attributes.category);
          if(item.attributes.category === "Homeopathy") {
            homeo.push(item.attributes);
          }
        })
        console.log('homeo', homeo);
        dispatch({
          type: GET_DOCTORS,
          payload: homeo,
        });
    }
    else if(filterObj.category === "Ayurveda") {
        let ayur = []
        response.data.data.map((item, index)=> {
          console.log(item.attributes.category);
          if(item.attributes.category === "Ayurveda") {
            ayur.push(item.attributes);
          }
        })
        console.log('ayur', ayur);
        dispatch({
          type: GET_DOCTORS,
          payload: ayur,
        });
    }
    else if(filterObj.category === "Heart") {
        let heart = []
        response.data.data.map((item, index)=> {
          console.log(item.attributes.category);
          if(item.attributes.category === "Heart") {
            heart.push(item.attributes);
          }
        })
        console.log('heart', heart);
        dispatch({
          type: GET_DOCTORS,
          payload: heart,
        });
    }
    else {
      dispatch({
        type: GET_DOCTORS,
        payload: doctors,
      });
    }
  } catch (error) {
    dispatch(setAlert(`${error}`, 'danger'));
  }
};

export const getSingleDoctor = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}${DOCTORS}/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: GET_SINGLE_DOCTOR,
      payload: { ...response.data.data.attributes, id: response.data.data.id },
    });
  } catch (error) {
    dispatch(setAlert(`${error}`, 'danger'));
  }
};

export const setFilter = (obj) => ({
  type: DOCTOR_FILTER,
  payload: obj,
});
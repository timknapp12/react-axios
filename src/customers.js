import axios from 'axios';
import apiURL from './api';

export const getCustomerList = function() {
  return axios.get(apiURL).then(response => {
    return response.data;
  })
}

export const postCustomer = function(customer) {
  return axios.post(apiURL, customer).then(response => {
    return response.data;
  })
}












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

export const getCustomer = function(id) {
    return axios.get(apiURL + id).then((response) => response.data);
}

export const updateCustomer = function(id, customer) {
    return axios.patch(apiURL + id).then((response) => response.data);
}

export const deleteCustomer = function(id) {
    return axios.delete(apiURL + id).then((response) => response.data);
}










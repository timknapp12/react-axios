import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';
import { postCustomer } from '../customers'
import { getCustomerList, getCustomer, updateCustomer, deleteCustomer } from '../customers';

class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: undefined,
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }
    this.createCustomer = this.createCustomer.bind(this);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.removeCustomer = this.removeCustomer.bind(this);
  }

  componentDidMount() {
    getCustomerList().then(list => {
      this.setState({ customerList: list });
    })
  }

  createCustomer(customer) {
    postCustomer(customer).then(response => {
      getCustomerList().then(list => {
        this.setState({
          customerList: [],
          initialLoad: true,
          creating: false,
          currentCustomer: null
        })
      })
    })
  }
  selectCustomer(id) {
    getCustomer(id).then((response) => {
      this.setState({currentCustomer: response.data, initialLoad: false
      })
    })
  }

  saveEdit(id, customer) {
    updateCustomer(id, customer).then((updatedCustomer) => {
      getCustomerList().then((list) => {
        this.setState({
          customerList: list,
          currentCustomer: updatedCustomer
        })
      })
    })
  }

  removeCustomer(id) {
    deleteCustomer(id).then((removedCustomer) => {
      getCustomerList().then((list) => {
        this.setState({
          customerList: list,
          currentCustomer: null,
          initialLoad: null
        })
      })
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="App__container">
          {
            this.state.customerList ?
              <List
                customerList={this.state.customerList || []}
                startNewCustomer={this.startNewCustomer}
                selectCustomer={this.selectCustomer} />
              : null
          }
          <Workspace initialLoad={this.state.initialLoad}
            createCustomer={this.createCustomer}
            currentCustomer={this.state.currentCustomer}
            creating={this.state.creating}
            saveEdit={this.saveEdit}
            removeCustomer={this.removeCustomer}
          />
        </div>
      </div>
    )
  }
}

export default App;
import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';
import { postCustomer } from '../customers'
import { getCustomerList } from '../customers';

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
  render() {
    return (
      <div>
        <Header />
        <div className="App__container">
          {
            this.state.customerList ?
              <List
                customerList={this.state.customerList || []}
                startNewCustomer={this.startNewCustomer} />
              : null
          }
          <Workspace initialLoad={this.state.initialLoad}
            createCustomer={this.createCustomer}
            currentCustomer={this.state.currentCustomer}
            creating={this.state.creating}
          />
        </div>
      </div>
    )
  }
}

export default App;
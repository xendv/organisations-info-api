import React from 'react';
import ReactDOM from 'react-dom';
import {MDBIcon} from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: [], text: '' };
      this.handleChange = this.handleChange.bind(this);
    }
  
    render() {
      return (
        <nav class="navbar fixed-top flex-md-nowrap p-2 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 ml-3" href="#">Карта ОПК Beta</a>
        
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <button class="btn btn-dark btn-floating"><MDBIcon icon="info"/></button>
          </li>
        </ul>
        </nav>
      );
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  }

  export default Header; 
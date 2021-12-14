import React from 'react';
import ReactDOM from 'react-dom';

class Nav extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: [], text: '' };
      this.handleChange = this.handleChange.bind(this);
    }
  
    render() {
      return (
        <nav
          id="sidebarMenu"
          class="collapse d-lg-block sidebar collapse"
          >
        <div class="position-sticky">
          <div class="list-group list-group-flush mx-3 mt-4">
            <a
              href="#"
              class="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
              >
              <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>Main dashboard</span>
            </a>
            <a href="#"
              class="list-group-item list-group-item-action py-2 ripple active"
              >
              <i class="fas fa-chart-area fa-fw me-3"></i><span>Webiste traffic</span>
            </a>
          </div>
        </div>
      </nav>
      );
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  }

  export default Nav; 
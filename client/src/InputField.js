import React from 'react';
import ReactDOM from 'react-dom';
import {MDBIcon} from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import loadData from './API';

class InputField extends React.Component {
    constructor(props) {
      super(props);
      this.params={
        url: 'https://localhost/datagraphs/data-graphs/php-server/api.php',
        request:'request',
        table: 'sample_data'
      }
      this.value = props.value;
      this.state= {value:this.value};
      this.onChange.bind(this);
      this._handleKeyDown.bind(this);
      this.saveValue.bind(this);
    }
  
    render() {
      if (this.props.enabled){
        return (
          <div class="form-outline">
            {this.state.changed && <MDBIcon icon="exclamation-circle" className="trailing"/> }
            <input class="disabled form-control form-control-dark text-center form-icon-trailing" type="text" onKeyDown={this._handleKeyDown} onChange={e => this.onChange(e)} value={this.state.value} placeholder="empty" defaultValue={this.value} />
          </div>
        );
      }
      else 
      return (
        <input class="form-white form-control form-control-dark text-center" type="text" placeholder="empty" defaultValue={this.value} disabled/>
      );
    }

    onChange = (e) => {
      if((this.props.enabled)){
        this.setState({ value: e.target.value, changed: true});
      }
    };

    _handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        console.log('do validate');
        this.saveValue(this.state.value);
      }
    }

    saveValue= (value) => {
      loadData(this.params.url,
        "request=saveTableValue&table="+this.params.table+
        "&field="+this.props.field+
        "&pk="+this.props.pk+
        "&id="+this.props.id+
        "&value="+value, (data) =>{
          this.setState({changed: false})
      });
    }
  }

  export default InputField; 
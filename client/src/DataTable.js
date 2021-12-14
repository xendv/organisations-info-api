import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import InputField from './InputField'
import axios from 'axios';
import loadData from './API';
import {MDBIcon} from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';

class DataTable extends React.Component {
    constructor(props) {
      super(props);
      this.params={
        url: 'https://localhost/datagraphs/data-graphs/php-server/api.php',
        request:'request',
        table: 'sample_data'
      }
      this.state={data: []};
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      loadData(this.params.url,"request=getTableData&table="+this.params.table, (data) =>{
        this.setState({table_info: data},() => console.log(this.state.data));
        loadData(this.params.url,"request=getTableContent&table="+this.params.table+"&order="+this.getPrimaryKey(), (data) =>{
          this.setState({data: data},() => console.log(this.state.data));
        });
      });
      
    }

    onSaveCallback(data){

    }

    checkIfPrimary(key){
      var primary = false;
      if (this.state.table_info != null){
        if (this.state.table_info.primary_key != null){
          this.state.table_info.primary_key.map(value => {
            if (value.name === key){
              console.log(value.name,key);
              primary = true;
            }
          })
        }
      }
      console.log(primary);
      return primary;
    }

    getPrimaryKey(){
      if (this.state.table_info != null){
        if (this.state.table_info.primary_key != null){
          return this.state.table_info.primary_key[0].name;
        }
      }
    }

    renderRows() {
      console.log("render");
      var index = 0;
      return (
      <tbody>
        {
          Object.values(this.state.data).map(row => {
            index++;
            return(
              <tr>
                <th scope="row">{index}.</th>
                {
                  Object.keys(row).map(key => {
                    return(<td>
                      <InputField value={row[key]} 
                        enabled={!this.checkIfPrimary(key)} 
                        callback={this.onSaveCallback()}
                        field={key}
                        pk={this.getPrimaryKey()}
                        id={row[this.getPrimaryKey()]} />
                    </td>)
                  })
                }
              </tr>
            )
          }) 
        }
      </tbody>
      )
    }

    renderHeader(){
        if (this.state.data[0] == null) return;
        return(
          <thead>
                <tr>
                <th scope="col"></th>
                 {
                   Object.keys(this.state.data[0]).map(key => {
                     if(this.checkIfPrimary(key)){
                      return(<td><b><u>{key}</u></b></td>)
                     } else {
                      return(<td>{key}</td>)
                     }
                   })
                 }
                </tr>
              </thead>
        )
    }
  
    render() {
      return (
      <section class="mb-4">
      <div class="card">
        <div class="card-header text-center py-3">
          <h5 class="mb-0 text-center">
            Текущая таблица <strong>{this.params.table}</strong>
          </h5>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover text-nowrap">
              {this.renderHeader()}
              {this.renderRows()}
            </table>
          </div>
        </div>
      </div>
    </section>
      );
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  }

  export default DataTable; 
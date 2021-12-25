import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import InputField from './InputField'
import axios from 'axios';
import loadData from './API';
import {MDBIcon} from 'mdbreact';
import TopoJSON from 'ol/format/topojson';
import VectorSource from 'ol/source/vector';
import Fill from 'ol/style/fill';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

class DataMapOld extends React.Component {
    constructor(props) {
      super(props);
      this.params={
        url: 'https://localhost/datagraphs/data-graphs/php-server/api.php',
        request:'request',
        table: 'sample_data'
      }
      this.vectorLayer = new VectorSource({
        url: './topo.json',
        format: new TopoJSON(),
        overlaps: false,
      });
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

    getPrimaryKey(){
      if (this.state.table_info != null){
        if (this.state.table_info.primary_key != null){
          return this.state.table_info.primary_key[0].name;
        }
      }
    }

    renderMap() {
      console.log("render");
      var index = 0;
      return (
        <div class="card-body">
          <Map view={{center: [0, 0], zoom: 4}}>
          <Layers>
            <layer.Vector source={this.vectorLayer} style={this.style}/> 
            <layer.Tile/>
          </Layers>
          <Controls attribution={false} zoom={true}>
            <control.ZoomToExtent />
            <control.Zoom />
          </Controls>
        </Map>
      </div>
      );
  }

  style = new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.6)',
    }),
    stroke: new Stroke({
      color: '#319FD3',
      width: 1,
    }),
  });
  

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
          {this.renderMap()}
      </div>
    </section>
      );
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  }

  export default DataMap; 
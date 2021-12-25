import 'ol/ol.css';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {Map} from "ol";
import {View} from "ol";
import {Tile} from "ol/layer";
import {Vector} from "ol/source";
import {OSM} from "ol/source";
import {GeoJSON} from "ol/format";
import Overlay from 'ol/Overlay';
import Color from 'color'
import {fromLonLat,toLonLat} from 'ol/proj';
import {Fill, Stroke, Style} from 'ol/style';
import VectorLayer from "ol/layer/Vector";
import {toStringHDMS} from 'ol/coordinate';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

//fromLonLat([62.379743469899715, 93.41872459573818])

class DataMap extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      center: [
      11187892.742408048,
      9641159.084657032
      ], 
      zoom: 4, 
      hover: null,
      isOpened: true,
      hint: ""
    };

    this.olmap = new Map({
      target: null,
      layers: [
        new VectorLayer({
          source: new Vector({
            format: new GeoJSON(),
            url: "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/russia.geojson"
          }),
          style: this.fillStyle
      })
      ],
      view: new View({
        center: this.state.center,
        zoom: this.state.zoom
      })
    });
    this.popupRef = React.createRef();
    this.popoverRef = React.createRef();
  }

  handleClose = () => {
    this.setState({isOpened: false});
  };

  handleOpen = () => {
    this.setState({isOpened: true});
  };



  fillStyle = function(feature) {
    var colors = {
        0: '#fff33b',
        1: '#fdc70c',
        2: '#f3903f',
        3: '#ed683c',
        4: '#e93e3a',
    };
    //console.log()
    var selector = feature.getProperties().cartodb_id % 5
    return [new Style({
      fill: new Fill({
        color: colors[selector],
      }),
      stroke: new Stroke({
        color: "#303030",
        width: 1,
      }),
    })]
  };

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.handleClose();
    this.olmap.setTarget("map");
    this.popup = new Overlay({
      element: this.popoverRef.current,
    });
    this.olmap.addOverlay(this.popup);
    let selected = null;
    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      //this.setState({ center, zoom });
    });

    this.olmap.on('pointermove', (e) => {
      var feature = this.olmap.forEachFeatureAtPixel(e.pixel, (f,layer) => {
          if (layer){
            return f;
          }
      });

      if(selected != feature){
        if (selected) {
          selected.setStyle(undefined);
        }
        if(feature){
          var newStyle = this.fillStyle(feature)[0];
          newStyle.getStroke().setWidth(2);
          var newColor = Color(newStyle.getFill().getColor()).lighten(0.1).hex();
          newStyle.getFill().setColor(newColor);
          feature.setStyle(newStyle);

          const coordinate = e.coordinate;
          const hdms = toStringHDMS(toLonLat(coordinate));
          this.handleOpen();
          this.setState({hint: this.createDynamicHint(feature)});
        } else {
          this.handleClose()
        }
        selected = feature
      }
    });
  }

  createDynamicHint(feature){
    return(
      <React.Fragment>
        <Typography color="" variant="body1">{feature.getProperties().name}</Typography>
        <em>{"Количество предприятий ОПК в регионе:"}</em> <b>{'300'}</b>.
        <br></br>
        <u>{'Плотность размещения: '}</u> <b><u>{'10%'}</u></b>
      </React.Fragment>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if(this.state.isOpened != nextState.isOpened || 
      this.state.hint != nextState.hint) return true;
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  userAction() {
    this.setState({ center: [546000, 6868000], zoom: 5 });
  }

  render() {
    //this.updateMap(); // Update map on render?
    return (
      <div class="fullscreen">
        <Tooltip title={this.state.hint} open={this.state.isOpened} onClose={this.handleClose} followCursor arrow>
        <div id="map">
        <div id="popup" title="Welcome to OpenLayers" ref={this.popupRef}></div>
        </div>
        </Tooltip>
    </div>
    );
  }
}

export default DataMap;

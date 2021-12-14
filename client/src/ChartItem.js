import React from 'react';
import ReactDOM from 'react-dom';
import { Line,Bar,Pie,Radar,Scatter,Chart } from 'react-chartjs-2';
import './css/mdb.dark.min.css';
import {MDBIcon} from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import loadData from './API';

class ChartItem extends React.Component {
    constructor(props) {
      super(props);
      this.interval = null;
      this.params = {
        url: 'https://localhost/datagraphs/data-graphs/php-server/api.php',
        labels_field: "Year",
        data_field: "Profit",
        table: "sample_data",
        timeout: 2000
      }
      this.type = props["type"];
      this.id = props["id"];
      this.state = {
        data:[0,0],
        labels:[0,0]
      };

      this.options = {};
      this.handleChange = this.handleChange.bind(this);
      switch (this.type){
        case "Pie":
          this.Chart = Pie;
          break;
        case "Bar":
          this.Chart = Bar;
          break;
        case "Radar":
          this.Chart = Radar;
          this.options = {
            scales: {
              r: {
                ticks: {
                  backdropColor: 'transparent'
                }
              }
            }
        };
          break;
        case "Scatter":
          this.Chart = Scatter;
          break;
        default:
          this.Chart = Line;
      }
      Chart.defaults.color='rgb(222,222,222)';
    }

    componentDidMount() {
      this.interval = setInterval(this.updateData, this.params.timeout);
      this.updateData();
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    updateData = () =>{
      console.log("Updating");
      loadData(this.params.url,"request=getGraphData&table="+this.params.table+"&field="+this.params.labels_field, (data) =>{
        if(!this.compareData(data,this.state.labels))
        this.setState({labels: data},() => console.log(this.state.data));
      });
      loadData(this.params.url,"request=getGraphData&table="+this.params.table+"&field="+this.params.data_field, (data) =>{
        if(!this.compareData(data,this.state.data))
        this.setState({data: data},() => console.log(this.state.data));
      });
    }  

    compareData = (value1, value2) =>{
      return value1.length === value2.length && value1.every((value, index) => value === value2[index]);
    }

    render() {
      const labels = this.state.labels;
      const data = {
        labels: labels,
        height: 50,
        datasets: [{
          label: this.props["name"],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          color: "#fff",
          data: this.state.data,
          fill: true,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          tension: 0.1
        }]
      };
      return (
        <section class="mb-4 col-sm">
          <div class="card">
            <div class="card-header py-3">
              <div className="container">
                <div class ="row justify-content-end">
                  <h5 class="mb-0 text-center"><strong>{this.props["name"]}</strong></h5>
                    <div class="d-grid d-md-block mt-2">
                      <button type="button" 
                        class="btn btn-sm btn-link" 
                        data-mdb-ripple-color="light">
                      <MDBIcon icon="edit" />
                      </button>
                      <button type="button" 
                        class="btn btn-sm btn-danger" 
                        data-mdb-ripple-color="light">
                     <MDBIcon icon="trash" />
                    </button>
                    </div>

                </div>
              </div>
            </div>
            <div class="card-body">
            <this.Chart data={data} options={this.options}/>
            </div>
          </div>
        </section>
      );
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  }

  export default ChartItem; 
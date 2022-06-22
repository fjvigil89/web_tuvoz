import React, { useState } from "react";

// reactstrap components
import {
  FormGroup,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Radar } from "react-chartjs-2";
// core components
import {
  chartOptions,
  parseOptions,
  chartOpenSmille,  
} from "variables/charts.js";

import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import useBaseURL from "../../../Hooks/useBaseURL";
const cookie = new Cookies();
const PraatChartModal = (props) => {
  //uso del Hooks para la url de la API
  const baseURL = useBaseURL(null);
  
  const [chartOpenSmilleData, setchartOpenSmilleData] = useState({      
    labels: ["label"],
    datasets: [{
      label: 'Normal Voice',
      fillColor: "rgba(155,155,155,1)",
      strokeColor: "rgba(155,155,155,1)",
      pointColor: "rgba(155,155,155,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(155,155,155,1)",
      data: [0.9052297640673617, 3.292198590261772, -1.0384583658483628, 1.8070101962607745e-05, -1.8201589437497527, -1.720369473141382, -0.7236063880446538, 0.7462139014966376, -1.6607312068216509, -0.03770186718401153, 0.20985557483270167, 0.6800619410112898, 1.060737321257339]
    }]      
});

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  } 
  

  const { buttonLabel, blob } = props;

  const [modalOpen, setModalOpen] = React.useState(false);

  const getData = async () => {
    
    axios.defaults.headers.Authorization = "Bearer " + cookie.get("token");
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    await axios.get(baseURL + "sanctum/csrf-cookie").then(() => {
      axios
        .get(baseURL + "api/modelPraat_s3Blob/"+blob)
        .then((response) => {
          //console.log(response.data);
          if (response.status === 200) {
            console.log(response);        
            let label = response.data.label;//array response fot query
            let data = response.data.data;//array response for query
            
            setchartOpenSmilleData({      
                labels: label,
                datasets: [{
                  label: 'Normal Voice',
                  fillColor: "rgba(155,155,155,1)",
                  strokeColor: "rgba(155,155,155,1)",
                  pointColor: "rgba(155,155,155,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(155,155,155,1)",
                  data: [0.9052297640673617, 3.292198590261772, -1.0384583658483628, 1.8070101962607745e-05, -1.8201589437497527, -1.720369473141382, -0.7236063880446538, 0.7462139014966376, -1.6607312068216509, -0.03770186718401153, 0.20985557483270167, 0.6800619410112898, 1.060737321257339]
                },
                {
                  label: '+ Standad',
                  fill: true,
                  fillColor: "rgb(255,105,97)",
                  strokeColor: "rgb(255,105,97)",
                  borderColor: 'rgb(255,105,97)',
                  pointBackgroundColor: 'rgb(255,105,97)',
                  pointBorderColor: '#ffdece',
                  pointHoverBackgroundColor: '#ffdece',
                  pointHoverBorderColor: 'rgb(255,105,97)',                
                  data: [2.242335304136552, 3.4623183654345033, -0.4804938577021248, 4.20040400137363e-05, -1.22552393705207, -1.2027053532665073, -0.12899194407067116, 1.2683663442584787, -1.1294089098086149, 0.5608159555903807, 0.7607131566028743, 1.1941442348337608, 1.6592485968789588]
                },
                {
                  label: '- Standad',                  
                  fill: true,
                  fillColor: "rgb(255,105,97)",
                  strokeColor: "rgb(255,105,97)",
                  borderColor: 'rgb(255,105,97)',
                  pointBackgroundColor: 'rgb(255,105,97)',
                  pointBorderColor: '#ffdece',
                  pointHoverBackgroundColor: '#ffdece',
                  pointHoverBorderColor: 'rgb(255,105,97)',

                  data: [-0.4318757760018288, 3.1220788150890404, -1.5964228739946007, -5.863836088520816e-06, -2.4147939504474354, -2.238033593016257, -1.3182208320186364, 0.22406145873479644, -2.192053503834687, -0.6362196899584038, -0.34100200693747096, 0.16597964718881886, 0.46222604563571923]
                },
                {
                  label: blob,
                  data: data,
                  fill: true,
                  fillColor: "rgb(54, 162, 235, 0.2)",
                  strokeColor: "rgb(54, 162, 235, 0.2)",
                  borderColor: 'rgba(54, 162, 235)',
                  pointBackgroundColor: 'rgba(54, 162, 235)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: '#fff',
                  pointHoverBorderColor: 'rgba(54, 162, 235)'
              }]      
            })
            setModalOpen(!modalOpen)
          }
        })
        .catch(() => {
          Swal.fire({
            title: "Oops!!",
            text: "there is a problem connecting with the API server!",
            icon: "warning",
            footer: '<span style="color: red">server with error!<span/>',
            toast: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 4000,
          });
        });
    });


  };

 const options = {
  legend: {
    display: true,
    position: 'top'
  },
  title: {
    display: false,
    text: 'Report Praat'
  },
  scale: {
    display: true,
    reverse: false,
    /* gridLines: {
      color: [
        'black',
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'indigo',
        'violet'
      ]
    }, */
    ticks: {
      beginAtZero: true
    }
  }
}

  return (
    <>
      <Button
        className="btn-icon icon-shape bg-blue text-white rounded-circle shadow"
        outline
        color="secundary"
        type="button"
        onClick={() => getData()}
        
      >
        <br></br>
        <span className="btn-inner--icon">
          <i className="ni ni-chart-pie-35" />
        </span>        
      </Button>

      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            {buttonLabel}
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <FormGroup>
          <div className="chart">
            <Radar
              data={chartOpenSmilleData}
              options={options}
              getDatasetAtEvent={(e) => console.log(e)}
            />
          </div>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Close
          </Button>          
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PraatChartModal;

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
const ChartModal = (props) => {
  //uso del Hooks para la url de la API
  const baseURL = useBaseURL(null);
  
  const [chartOpenSmilleData, setchartOpenSmilleData] = useState("openSmille");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  } 
  

  const { buttonLabel, path } = props;

  const [modalOpen, setModalOpen] = React.useState(false);

  const getData = async () => {
    axios.defaults.headers.Authorization = "Bearer " + cookie.get("token");
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    await axios.get(baseURL + "sanctum/csrf-cookie").then(() => {
      axios
        .get(baseURL + "api/modelPraat/"+path)
        .then((response) => {
          //console.log(response.data);
          if (response.status === 200) {
            //console.log(response);        
            let label = response.data.label;//array response fot query
            let data = response.data.data;//array response for query
            setchartOpenSmilleData({      
                labels: label,
                datasets: [{
                    label: 'My First Dataset',
                    data: data,
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                },
              ]      
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
          <i className="ni ni-chart-bar-32" />
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
              options={chartOpenSmille.options}
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

export default ChartModal;

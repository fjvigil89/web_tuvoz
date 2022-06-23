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
const SoundModal = (props) => {
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
      setModalOpen(!modalOpen)
  };

     
  const phrase = [        
    {id:1, name:"Aaaaaaaaa",},
    {id:2, name:"Iiiiiiiii",},
    {id:3, name:"Uuuuuuuuu",},
    {id:4, name:"Érase un pastor que tenía un rebaño. ",},
    {id:5, name:"En el monte se aburría mucho.",},
    {id:6, name:"¡Que viene el lobo, socorro! gritó el pastor.",},
    {id:7, name:"Uno de ellos preguntó: ¿Dónde está el lobo?",},
    {id:8, name:"¡Socorro, el lobo se está comiendo a mis ovejas!",},
    {id:9, name:"El lobo se comió todo el rebaño",},
    {id:10, name:"En boca del mentiroso, lo cierto se hace dudoso."},
   ];

  return (
    <>
      <Button
        className="btn-icon icon-shape bg-blue text-white rounded-circle shadow"
        style={{padding:"5px"}}
        
        color="secundary"
        type="button"
        onClick={() => getData()}
        
      >
        <span className="btn-inner--icon">
          <i className="ni ni-headphones" />
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
          <div className="chart text-aling-center">
              <p>Paciente: {blob.metadato.split("(")[0]}</p>
              <p>Sonido: {phrase[(blob.metadato.split("(")[1].split(")")[0])-1].name}</p>
              

              <audio controls="controls">
                <source src={"https://tuvoz-bucket.s3.eu-central-1.amazonaws.com/"+blob.record} type="audio/mp4" />
              </audio>
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

export default SoundModal;

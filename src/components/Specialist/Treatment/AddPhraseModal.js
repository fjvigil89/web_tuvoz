import React, { useState } from "react";

// reactstrap components
import {     
    FormGroup,    
    Input,          
    Button, 
    Modal, 
    ModalBody, 
    ModalFooter, 
    Fade,
    Badge } from "reactstrap";
import Cookies from 'universal-cookie';
const cookie = new Cookies();

const AddPhraseModal= (props) => {

    const [ phrase, setPhrase ] = useState({
        namePhrase:''
    });

    const {
      buttonLabel,                     
      } = props;

    const [ listPhrase, setlistPhrase ] = useState([]);

    

    const cachePhrase = async()=>{
        const newList = listPhrase.concat(phrase.form);
        await setlistPhrase(newList);
        await cookie.set('cachePhrase', newList, {path: '/' , maxAge: '10800'});         

      document.getElementById("namePhrase").value="";
    }

      //Captura los valores del formulario
      const handlePhraseChange = async e =>{  
        await setPhrase({
            form:{
                ...phrase.form,
                [e.target.name]: e.target.value
            }
        });            
    }

  const [modalOpen, setModalOpen] = React.useState(false);
  

  return (
    <>
      <Button
        color="primary"
        type="button"
        onClick={() => setModalOpen(!modalOpen)}
      > 
      
        <span>{ buttonLabel }</span>
        <Badge
          className="badge-circle badge-floating border-white"
          color="primary"
          size="md"
        >
          { listPhrase.length }
        </Badge>
      </Button>



      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            { buttonLabel }
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
                <label htmlFor="exampleFormControlTextarea1">Phrase
                    <Badge
                        className="badge-circle badge-floating border-white"
                        color="primary"
                        size="md"
                        >
                        { listPhrase.length }
                    </Badge>                    
                </label>                
                <Input
                className=" form-control-alternative"
                id="namePhrase"
                name="namePhrase"
                placeholder="Phrase"
                type="text"  
                maxlength="255"
                onChange= { handlePhraseChange }              
                ></Input>
                 
                {
                    listPhrase.map( (item, index) =>(
                        <Fade tag="h5" className="mt-3" key={index}>
                            {item.namePhrase}
                        </Fade>
                        
                    ))
                }


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
          <Button color="primary" type="button" onClick= {cachePhrase}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AddPhraseModal;
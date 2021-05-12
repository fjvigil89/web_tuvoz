import React, { useEffect, useState } from 'react';

import {  
  Card,
  CardHeader,
  Media,  
  Container,
  Row,  
  FormGroup,
  Form,
  Input,      
  Col,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import useBaseURL from '../../Hooks/useBaseURL';
import AddPhraseModal from "./AddPhraseModal.js";

const cookie = new Cookies();

const AddFrom = () => {    
  //uso del Hooks para la url de la API
  const baseURL= useBaseURL(null);
 
  useEffect(()=>{            
    if(!cookie.get('token')){    
      window.location.href = "/auth/login"; 
    }
    
  },[]);

    const [treatment, setTreatment] = useState({
        nameTreatment: '',
        descTreatment: ''
    })

  //Captura los valores del formulario
    const handleChange = async e =>{  
        await setTreatment({
            form:{
                ...treatment.form,
                [e.target.name]: e.target.value
            }
        });
    }

    const addTreatment = async()=>{
        axios.defaults.headers.Authorization = "Bearer " + cookie.get('token');       
        await axios.get(baseURL+'sanctum/csrf-cookie').then(() => {            
            // // Logout...
            axios.post(baseURL+"api/treatment",{                
                    name: treatment.form.nameTreatment,
                    desc: treatment.form.descTreatment,
                    phrase: cookie.get('cachePhrase')
            })
            .then(response =>{                                
                cookie.remove('cachePhrase', {path: '/'});         
                Swal.fire({
                    title: 'Woww!!',
                    text: response.data.message,
                    icon: "success",
                    footer: '<span style="color: blue">Thanks!<span/>',        
                    toast: true,
                    position: "top-right",        
                    showConfirmButton: false,
                    timer: 4000,
                  });
                
                resetForm();
                
            })  
            .catch(error=>{      
                console.log(error);
            });
            
            
        });        
    }
    
   
    const resetForm = async()=>{
        document.getElementById("nameTreatment").value="";
        document.getElementById("descTreatment").value="";
        await setTreatment({           
            nameTreatment: '',
            descTreatment: ''
        });

    }
    return (
      <>          
          <Container className="mt--7" fluid>
          {/* Table */}      
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Media className="align-items-center">                                                   
                    <button className="btn-icon-clipboard" data-clipboard-text="ruler-pencil" id="tooltip693938896" type="button">
                        <div>
                            <i className="ni ni-ruler-pencil"></i>
                        
                            <Media>
                                <span className="mb-0 text-sm">
                                <h3 className="mb-0">Add Treatment</h3>
                                </span>
                            </Media> 
                        </div>
                    </button>                       
                                             
                  </Media>
                  
                </CardHeader>
            
                <div className=" p-4 bg-secondary">
                    <Form role="form">
                        <Row>
                            
                            <Col md="8">
                            <FormGroup>
                                <label htmlFor="exampleFormControlTextarea1">Name Treatment</label>
                                <Input
                                className=" form-control-alternative"
                                id="nameTreatment"
                                name="nameTreatment"
                                placeholder="Name Treatment"
                                type="text"
                                onChange= { handleChange }                                
                                ></Input>
                            </FormGroup>
                            </Col>  
                            <Col md="4">                        
                            </Col>                        
                        </Row> 

                        <Row>
                            <Col md="8">
                            <FormGroup>
                                <label htmlFor="exampleFormControlTextarea1">Description Tretament</label>
                                <Input                                 
                                rows="3" 
                                type="textarea"
                                onChange= { handleChange }
                                name="descTreatment"
                                id="descTreatment"
                                placeholder="Description Treatment"
                                ></Input>
                            </FormGroup>
                            </Col>  
                            <Col md="4">                        
                            </Col>                        
                        </Row> 

                        <Row>                             
                            <Col md="6">                                                                   
                                    <AddPhraseModal
                                     buttonLabel="Add Phrase"                                     
                                    >
                                    </AddPhraseModal>            
                            </Col>

                        </Row> 

                        <Row>
                            <Col md="8">                            
                            </Col>  
                            <Col md="2">  
                                {
                                    typeof(treatment.form) !=='undefined' ?                                        
                                        <Button 
                                            className="btn-icon btn-1" 
                                            color="primary" 
                                            type="button"  
                                            href=""
                                            onClick={(e) => addTreatment()}>
                                            <span className="btn-inner--icon">
                                            <i className="ni ni-fat-add"></i>
                                            </span>
                                            <span className="btn-inner--text">Add</span>
                                        </Button>                      
                                                                                
                                    :
                                        <Button 
                                            className="btn-icon btn-1" 
                                            color="primary" 
                                            type="button"  
                                            href=""
                                            disabled 
                                            >
                                            <span className="btn-inner--icon">
                                            <i className="ni ni-fat-add"></i>
                                            </span>
                                            <span className="btn-inner--text">Add</span>
                                        </Button>

                                    
                                }                      
                                
                            </Col>    
                            <Col md="2">
                                <Link to="/admin/treatments">
                                    <Button 
                                        className="btn-icon btn-1" 
                                        color="danger" 
                                        type="button">                                        
                                        <span className="btn-inner--icon">
                                        <i className="ni ni-fat-remove"></i>
                                        </span>
                                        <span className="btn-inner--text">Cancel</span>
                                    </Button>                   
                                </Link>                           

                            </Col>                        
                        </Row> 

                        
                        
                        
                    </Form>
                </div>
              </Card>
            </div>
          </Row>        
        </Container>
      </>
    );
  
}
export default AddFrom;
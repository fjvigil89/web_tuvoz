import React, { useEffect, useState } from 'react';

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Button,
  UncontrolledTooltip,   
} from "reactstrap";

import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import useBaseURL from '../../Hooks/useBaseURL';


const cookie = new Cookies();

const ListPatientTable = (props) => {    
  //uso del Hooks para la url de la API
  const baseURL= useBaseURL(null);
  

  const {
    idTreatment,
    nameTreatment
  } = props;

  //gusrdar los tratamientos del Usuario Logueado
  const [patient, setPatient]  = useState([]);
  

  //metodo Sincronico para el consumo del login en la api
  const Patients = async()=>{  
    axios.defaults.headers.Authorization = "Bearer " + cookie.get('token'); 
    await axios.get(baseURL+'sanctum/csrf-cookie').then(() => {
      // get Tratamientos
      axios.get(baseURL+'api/getPatientNotTreatment',{
        params:{
          idTreatment: idTreatment
        }
      })
      .then(response =>{        
        setPatient(response.data.data);           
      })    
      .catch(err => {                            
        Swal.fire({
          title: 'Oops!!',
          text: "there is a problem connecting with Treatment the API server!",
          icon: "warning",
          footer: '<span style="color: red">server with error!<span/>',        
          toast: true,
          position: "top-right",        
          showConfirmButton: false,
          timer: 4000,
        })        
      })   
    })
  };

  //metodo Sincronico para el consumo del login en la api
  const AssociatePatients = async(idPatient)=>{  
    axios.defaults.headers.Authorization = "Bearer " + cookie.get('token'); 
    await axios.get(baseURL+'sanctum/csrf-cookie').then(() => {
      // get Tratamientos
      axios.post(baseURL+'api/associatePatientTreatment',{        
          idTreatment: idTreatment,
          idPatient: idPatient        
      })
      .then(() =>{        
        Patients();
      })    
      .catch(err => {                            
        Swal.fire({
          title: 'Oops!!',
          text: "there is a problem connecting with Treatment the API server!",
          icon: "warning",
          footer: '<span style="color: red">server with error!<span/>',        
          toast: true,
          position: "top-right",        
          showConfirmButton: false,
          timer: 4000,
        })        
      })   
    })
  };
  

  useEffect(()=>{            
    Patients()

    if(!cookie.get('token')){    
      window.location.href = "/auth/login"; 
    }
    
  },[]);

    return (
      <>          
          <Container className="mt--7" fluid>
          {/* Table */}      
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              <h3 className="mb-0">{nameTreatment}</h3>
                            </span>

                          </Media>                                 
                                             
                  </Media>
                  
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">email</th>
                      <th scope="col">alta</th>                      
                      <th className=" text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody> 
                        {
                          patient.map( (item, index) =>(       
                          <tr key={item.id}>
                            <th scope="row">
                              <Media className="align-items-center">                      
                                <span className="mb-0 text-sm">
                                  {item.name}
                                </span>
                              </Media>                      
                            </th>
                            <td>{ 
                              item.email                              
                              
                              }</td>                            
                            <td>                            
                              <span className="mb-0 text-sm">
                                    {item.createdAt}
                              </span>
                            </td>                            
                            <td className=" td-actions text-right">  
                                <Button
                                  className=" btn-icon"
                                  color="info"
                                  size="sm"
                                  type="button"
                                  onClick = {(e)=> AssociatePatients(item.id)}
                                >                                                
                                  <i className="ni ni-user-run pt-1"></i>                              
                                </Button>     
                            </td>
                          </tr>

                        ))
                        } 
    
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>        
        </Container>
      </>
    );
  
}
export default ListPatientTable;
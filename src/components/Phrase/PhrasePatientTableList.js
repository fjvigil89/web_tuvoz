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
  UncontrolledTooltip,
  Button,
  NavItem,   
} from "reactstrap";

import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import useBaseURL from '../../Hooks/useBaseURL';
import RecordPatienModal from "./RecordPatientModal"

const cookie = new Cookies();

const PhrasePatientTableList = (props) => {    
  const baseURL= useBaseURL(null);
  const {
      idTreatment,                     
      } = props;
  
  const [modalOpen, setModalOpen] = React.useState(false);

  const [ phrase, setPhrase] = useState([]);

    
//metodo Sincronico para el consumo del login en la api
  const Phrases = async()=>{  
    setModalOpen(!modalOpen);

    axios.defaults.headers.Authorization = "Bearer " + cookie.get('token'); 
    await axios.get(baseURL+'sanctum/csrf-cookie').then(() => {
      // get Tratamientos
      axios.get(baseURL+'api/phrasePatientTreatment/'+idTreatment)      
      .then(response =>{  
        //console.log(response);                       
        setPhrase(response.data.data);                        
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
    Phrases()

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
                              <h3 className="mb-0">Frases</h3>
                            </span>

                          </Media>                                 
                                             
                  </Media>
                  
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Frases</th>                      
                      <th scope="col">Status</th>                                            
                      <th className=" text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody> 
                        {
                          phrase.map( (item, index) =>(       
                          <tr key={item.id}>
                            <th scope="row">
                              <Media className="align-items-center">                      
                                <span className="mb-0 text-sm">
                                  {item.phrase}
                                </span>
                              </Media>                      
                            </th>                            
                            <td>
                              <Badge color="" className="badge-dot mr-4">
                                {
                                  item.status === 1 ? <><i className="bg-success" /> terminado</> : <><i className="bg-warning" /> incompleto </>
                                }
                              </Badge>                             
                            </td>                           
                           
                            <td className=" td-actions text-right">  
                               
                                <RecordPatienModal
                                  idPhrase = { item.id }
                                  namePhrase= {item.phrase}
                                >

                                </RecordPatienModal>

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
export default PhrasePatientTableList;
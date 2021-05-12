import React, { useEffect, useState } from 'react';

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Button,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,    
} from "reactstrap";
import { Link } from "react-router-dom";

import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import useBaseURL from '../../Hooks/useBaseURL';
import Header from "components/Headers/Header.js";

const cookie = new Cookies();

const AdminTableList = () => {    
  //uso del Hooks para la url de la API
  const baseURL= useBaseURL(null);
  
  //gusrdar los tratamientos del Usuario Logueado
  const [treatment, setTreatment]  = useState([]);
  

  //metodo Sincronico para el consumo del login en la api
  const Tratamientos = async()=>{  
    axios.defaults.headers.Authorization = "Bearer " + cookie.get('token'); 
    await axios.get(baseURL+'sanctum/csrf-cookie').then(() => {
      // get Tratamientos
      axios.get(baseURL+'api/treatment')      
      .then(response =>{         
        setTreatment(response.data.data);                
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
  
  const deleteTreatment = async(id) =>{
    axios.defaults.headers.Authorization = "Bearer " + cookie.get('token'); 
    await axios.get(baseURL+'sanctum/csrf-cookie').then(() => {
      // get Tratamientos
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(baseURL+'api/treatment/'+id)      
            .then(() =>{                 
              Tratamientos()              

              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )              
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
          
        }
      })         
    })

  }
  

  useEffect(()=>{            
    Tratamientos()

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
                          <Link className="avatar avatar-sm" to="/admin/addtreatment">
                          <img
                              alt="..."
                              className="rounded-circle"
                              src={
                                require("../../assets/img/theme/plus1.jpg")
                                  .default
                              }
                            />
                          </Link>

                          <Media>
                            <span className="mb-0 text-sm">
                              <h3 className="mb-0">Treatment</h3>
                            </span>

                          </Media>                                 
                                             
                  </Media>
                  
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Treatment</th>
                      <th scope="col">Description</th>
                      <th scope="col">Status</th>
                      <th scope="col">Users</th>
                      <th scope="col">Completion</th>
                      <th className=" text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody> 
                        {
                          treatment.map(item =>(       
                          <tr key={item.id}>
                            <th scope="row">
                              <Media className="align-items-center">                      
                                <span className="mb-0 text-sm">
                                  {item.name}
                                </span>
                              </Media>                      
                            </th>
                            <td>{ 
                              item.desc.length > 50 ? item.desc.substr(1,40)+'...' : item.desc                              
                              
                              }</td>
                            <td>
                              <Badge color="" className="badge-dot mr-4">
                                {
                                  item.status === 1 ? <><i className="bg-success" /> activated</> : <><i className="bg-warning" /> disabled </>
                                }
                              </Badge>                             
                            </td>
                            <td>
                              <div className="avatar-group">
                                {item.patients.map( patient => (                                  
                                  <>                                  
                                    {
                                      patient.map( user => (
                                        <>
                                          <a 
                                            className="avatar avatar-sm"
                                            href="#pablo"
                                            id={user.name}
                                            onClick={(e) => e.preventDefault()}
                                            >
                                            <img
                                              alt="..."
                                              className="rounded-circle"
                                              src={
                                                require("../../assets/img/theme/team-1-800x800.jpg")
                                                  .default
                                              }
                                            />
                                            </a>
                                            <UncontrolledTooltip 
                                            delay={user.id}
                                            target={user.name}
                                            >
                                            { user.name}
                                            </UncontrolledTooltip>  
                                        </>
                                      ))
                                    }
                                    
                                   </>
                                ))}
      
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="mr-2">60%</span>
                                <div>
                                  <Progress
                                    max="100"
                                    value="60"
                                    barClassName="bg-danger"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className=" td-actions text-right">
                              <Button
                                className=" btn-icon"
                                color="info"
                                size="sm"
                                type="button"
                                id={item.name+"info"}
                              >
                              <i className=" ni ni-circle-08 pt-1"></i>
                              
                              <UncontrolledTooltip 
                                  delay={item.id}
                                  target={item.name+"info"}
                                  >
                                  info
                                  </UncontrolledTooltip> 
                              </Button>
                              
                              <Button
                                className=" btn-icon"
                                color="success"
                                size="sm"
                                type="button"
                                id={item.name+"edit"}
                              >
                                <i className=" ni ni-ruler-pencil pt-1"></i>
                                <UncontrolledTooltip 
                                  delay={item.id}
                                  target={item.name +"edit"}
                                  >
                                  edit
                                </UncontrolledTooltip> 
                              
                              </Button>

                              <Button
                                className=" btn-icon"
                                color="danger"
                                size="sm"
                                type="button"
                                onClick= {(e) =>deleteTreatment(item.id)}
                                id={item.name+"delete"}
                              >
                                <i className=" ni ni-fat-remove pt-1"></i>
                                <UncontrolledTooltip 
                                  delay={item.id}
                                  target={item.name+"delete"}
                                  >
                                  delete
                                </UncontrolledTooltip> 
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
export default AdminTableList;
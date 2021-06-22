import React, { useEffect, useState } from 'react';

import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Badge,
  UncontrolledTooltip
} from "reactstrap";
import { Link } from "react-router-dom";

import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import useBaseURL from '../../../Hooks/useBaseURL';
import RegisterPatient from "./RegisterPatientsModal";

const cookie = new Cookies();

const TablePatientsList = () => {
  //uso del Hooks para la url de la API
  const baseURL = useBaseURL(null);

  //gusrdar los tratamientos del Usuario Logueado
  const [listPatients, setListPatients] = useState([]);


  //metodo Sincronico para el consumo del login en la api
  const getAllPatients = async () => {
    axios.defaults.headers.Authorization = "Bearer " + cookie.get('token');
    await axios.get(baseURL + 'sanctum/csrf-cookie').then(() => {
      // get Tratamientos
      axios.get(baseURL + 'api/getAllpatient')
        .then(response => {
          setListPatients(response.data.data);
        })
        .catch(() => {
          Swal.fire({
            title: 'Oops!!',
            text: "there is a problem connecting with  the API server!",
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




  useEffect(() => {
    getAllPatients();
    if (!cookie.get('token')) {
      window.location.href = "/auth/login";
    }

  }, []);

  return (
    <>
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Media className="align-items-center">
                  <RegisterPatient
                    buttonLabel="Registrar Paciente"

                  >
                  </RegisterPatient>


                </Media>

              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"> </th>
                    <th scope="col">Nombre</th>
                    <th scope="col">identificador</th>
                    <th scope="col">email</th>
                    <th scope="col"> status </th>
                    <th className=" text-right">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listPatients.map(item => (
                      <tr key={item.id}>
                        <th scope="row">
                          <Media className="align-items-center">
                            <span className="mb-0 text-sm">
                              <>

                                <Link
                                  className="avatar avatar-sm"
                                  to={"/admin/user-profile/" + item.id}
                                  id={item.name.split(' ')[0]}
                                >
                                  <img
                                    alt="..."
                                    className="rounded-circle"
                                    src={
                                      require("../../../assets/img/theme/team-1-800x800.jpg")
                                        .default
                                    }
                                  />
                                </Link>
                                <UncontrolledTooltip
                                  delay={item.id}
                                  target={item.name.split(' ')[0]}
                                >
                                  {item.name.split(' ')[0]}
                                </UncontrolledTooltip>

                              </>
                            </span>
                          </Media>
                        </th>
                        <td>

                          <Link                            
                            to={"/admin/user-profile/" + item.id}
                            id={item.name}
                          >
                            {item.name.length > 50 ? item.name.substr(1, 40) + '...' : item.name}
                          </Link>


                        </td>
                        <td>
                          {
                            item.identificador.length > 50 ? item.identificador.substr(1, 40) + '...' : item.identificador
                          }
                        </td>
                        <td>

                          <a href={"mailto:" + item.email}>
                            {item.email}
                          </a>
                        </td>
                        <td>
                          <Badge color="" className="badge-dot">
                            {
                              (item.status === 1) ? <> <i className="bg-success" /> activo </> : <> <i className="bg-warning" /> pendiente </>
                            }
                          </Badge>
                        </td>
                        <td className=" td-actions text-right">

                          <Link to="#">
                            <Button
                              className=" btn-icon"
                              color="info"
                              size="sm"
                              type="button"
                              onClick={(e) => e.preventDefault()}
                              id={item.id}
                            >
                              <i className=" ni ni-fat-remove pt-1"></i>

                              Baja

                            </Button>
                          </Link>
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
export default TablePatientsList;
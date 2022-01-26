import React, { useEffect, useState } from 'react';

import {
  Card,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
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
import useFormatterDate from '../../Hooks/useFormatterDate';
import ShowPhraseModal from "./ShowPhraseModal.js";

const cookie = new Cookies();

const ListPatientTable = (props) => {
  //uso del Hooks para la url de la API
  const baseURL = useBaseURL(null);

  const formatter = new useFormatterDate();


  const {
    idTreatment,
    nameTreatment
  } = props;

  //gusrdar los tratamientos del Usuario Logueado
  const [patient, setPatient] = useState([]);

  //metodo Sincronico para el consumo del login en la api
  const Patients = async () => {
    axios.defaults.headers.Authorization = "Bearer " + cookie.get('token');
    await axios.get(baseURL + 'sanctum/csrf-cookie').then(() => {
      // get Tratamientos
      axios.get(baseURL + 'api/getPatientNotTreatment', {
        params: {
          idTreatment: idTreatment
        }
      })
        .then(response => {
          //console.log(response);
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
  const AssociatePatients = async (idPatient) => {
    axios.defaults.headers.Authorization = "Bearer " + cookie.get('token');
    await axios.get(baseURL + 'sanctum/csrf-cookie').then(() => {
      // get Tratamientos
      axios.post(baseURL + 'api/associatePatientTreatment', {
        idTreatment: idTreatment,
        idPatient: idPatient
      })
        .then(() => {
          //console.log(response);
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

  const UnAssociatePatients = async (idPatient) => {
    axios.defaults.headers.Authorization = "Bearer " + cookie.get("token");
    await axios.get(baseURL + "sanctum/csrf-cookie").then(() => {
      // get Tratamientos
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(baseURL + 'api/unassociatePatientTreatment', {
            idTreatment: idTreatment,
            idPatient: idPatient
          }).then((response) => {
            //console.log(response);
            Patients();
            Swal.fire("UnAssociate!", "Your file has been UnAssociate.", "success");
          })         
            .catch((err) => {
              Swal.fire({
                title: "Oops!!",
                text: "there is a problem connecting with Treatment the API server!",
                icon: "warning",
                footer: '<span style="color: red">server with error!<span/>',
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 4000,
              });
            });
        }
      });
    });
  };


  useEffect(() => {
    Patients()

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
                    <th scope="col"> </th>
                    <th scope="col">Nombre</th>
                    <th scope="col">email</th>
                    <th scope="col">alta</th>
                    <th className=" text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    patient.map((item, index) => (
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
                                    src={item.foto}
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
                          <Media className="align-items-center">
                            <span className="mb-0 text-sm">
                              {item.name}
                            </span>
                          </Media>
                        </td>
                        <td>{
                          item.email

                        }</td>
                        <td>
                          <span className="mb-0 text-sm">
                            {
                              formatter.format(Date.parse(item.created_at))

                            }
                          </span>
                        </td>
                        { item.assignment === false ?  
                          <td className=" td-actions text-right">
                            <Button
                              className=" btn-icon"
                              color="info"
                              size="sm"
                              type="button"
                              onClick={(e) => AssociatePatients(item.id)}
                            >
                              <i className="ni ni-check-bold pt-1"></i>
                            </Button>
                          </td>
                          : 
                          <>
                          <td className=" td-actions text-right">
                            <ShowPhraseModal buttonLabel="Lista de Frases" patient={item.id} idTreatment={idTreatment}></ShowPhraseModal>
                          
                            <Button
                              className=" btn-icon"
                              color="danger"
                              size="sm"
                              type="button"
                              onClick={(e) => UnAssociatePatients(item.id)}
                            >
                              <i className="ni ni-fat-remove pt-1"></i>
                            </Button>
                          </td>
                          </>
                          
                        }
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
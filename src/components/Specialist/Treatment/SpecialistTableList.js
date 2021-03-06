import React, { Fragment, useEffect, useState } from "react";

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
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Progress,
} from "reactstrap";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import useBaseURL from "../../../Hooks/useBaseURL";
import useFormatterDate from '../../../Hooks/useFormatterDate';

const cookie = new Cookies();

const SpecialistTableList = () => {
  //uso del Hooks para la url de la API
  const baseURL = useBaseURL(null);
  const formatter = new useFormatterDate();

  //gusrdar los tratamientos del Usuario Logueado
  const [treatment, setTreatment] = useState([]);



  //metodo Sincronico para el consumo del login en la api
  const Tratamientos = async () => {
    axios.defaults.headers.Authorization = "Bearer " + cookie.get("token");
    await axios.get(baseURL + "sanctum/csrf-cookie").then(() => {
      // get Tratamientos
      axios.get(baseURL + "api/treatment")
        .then((response) => {
          //console.log(response.data.data);
          setTreatment(response.data.data);
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
    });
  };

  const deleteTreatment = async (id) => {
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
          axios.delete(baseURL + "api/treatment/" + id)
            .then(() => {
              Tratamientos();

              Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
    Tratamientos();

    if (!cookie.get("token")) {
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
              {cookie.get("role") === "Specialist" ?
                <CardHeader className="border-0">
                  <Media className="align-items-center">
                    <Link className="avatar avatar-sm" to="/admin/addtreatment">
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../../assets/img/theme/plus1.jpg").default
                        }
                      />
                    </Link>

                    <Media>
                      <span className="mb-0 text-sm">
                        <h3 className="mb-0">Tratamientos</h3>
                      </span>
                    </Media>
                  </Media>
                </CardHeader>
                : null
              }

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tratamientos</th>
                    <th scope="col">Descripci??n</th>
                    <th scope="col">Paciente</th>
                    <th scope="col">Status</th>
                    <th scope="col">Terminaci??n</th>
                    <th scope="col">Creado</th>
                    <th className=" text-right">Acci??n</th> 
                  </tr>
                </thead>
                <tbody>
                  {treatment.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <span className="mb-0 text-sm">{item.name}</span>
                        </Media>
                      </th>
                      <td>
                        {item.desc.length > 50
                          ? item.desc.substr(1, 40) + "..."
                          : item.desc}
                      </td>
                      <td>
                        <div className="avatar-group">
                          {item.patients.map((patient, index) => (
                            <Fragment key={index}>
                              {patient.map((user) => (
                                <>
                                  <Link key={user.id}
                                    className="avatar avatar-sm"
                                    to={"/admin/user-profile/" + user.id}
                                    id={user.name.split(" ")[0]}
                                  >
                                    <img
                                      alt="..."
                                      className="rounded-circle"
                                      src={user.foto}

                                    />
                                  </Link>
                                  <UncontrolledTooltip
                                    delay={user.id}
                                    target={user.name.split(" ")[0]}
                                  >
                                    {user.name.split(" ")[0]}
                                  </UncontrolledTooltip>
                                </>
                              ))}
                            </Fragment>
                          ))}
                        </div>
                      </td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          {item.status === 1 ? (
                            <>
                              <i className="bg-success" /> activo
                            </>
                          ) : (
                            <>
                              <i className="bg-warning" /> pendiente
                            </>
                          )}
                        </Badge>
                      </td>
                      <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{item.porcientoTreatmentComplete+'%'}</span>
                            <div>
                              <Progress
                                max="100"
                                value={item.porcientoTreatmentComplete}
                                barClassName={item.porcientoTreatmentComplete < 90 ? "bg-danger" : (item.porcientoTreatmentComplete < 100 ? "bg-info" : "bg-success")}
                              />
                            </div>
                          </div>
                        </td>
                      <td>
                        {
                          formatter.format(Date.parse(item.created_at))
                        }
                      </td>
                      <td className=" td-actions text-right">
                        <Link
                          to={"/admin/listPatient/" + item.id + "/" + item.name}
                          params={{ id: item.id, name: item.name }}
                        >
                          <Button
                            className=" btn-icon"
                            color="info"
                            size="sm"
                            type="button"
                            id={item.name.split(" ")[0] + "info"}
                          >
                            <i className=" ni ni-circle-08 pt-1"></i>

                            <UncontrolledTooltip
                              delay={item.id}
                              target={item.name.split(" ")[0] + "info"}
                            >
                              Pacientes
                            </UncontrolledTooltip>
                          </Button>
                        </Link>

                        <Link to="#">
                          <Button
                            className=" btn-icon"
                            color="success"
                            size="sm"
                            type="button"
                            id={item.name.split(" ")[0] + "edit"}
                          >
                            <i className=" ni ni-ruler-pencil pt-1"></i>
                            <UncontrolledTooltip
                              delay={item.id}
                              target={item.name.split(" ")[0] + "edit"}
                            >
                              Editar
                            </UncontrolledTooltip>
                          </Button>
                        </Link>
                        <Link to="#">
                          <Button
                            className=" btn-icon"
                            color="danger"
                            size="sm"
                            type="button"
                            onClick={(e) => deleteTreatment(item.id)}
                            id={item.name.split(" ")[0] + "delete"}
                          >
                            <i className=" ni ni-fat-remove pt-1"></i>
                            <UncontrolledTooltip
                              delay={item.id}
                              target={item.name.split(" ")[0] + "delete"}
                            >
                              Eliminar
                            </UncontrolledTooltip>
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
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
};
export default SpecialistTableList;

import React, { useEffect, useState } from "react";

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
} from "reactstrap";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import useBaseURL from "../../../Hooks/useBaseURL";

const cookie = new Cookies();

const AdminRecordTableList = () => {
  //uso del Hooks para la url de la API
  const baseURL = useBaseURL(null);

  //gusrdar los tratamientos del Usuario Logueado
  const [record, setRecord] = useState([]);

  //metodo Sincronico para el consumo del login en la api
  const getAllRecord = async () => {
    axios.defaults.headers.Authorization = "Bearer " + cookie.get("token");
    await axios.get(baseURL + "sanctum/csrf-cookie").then(() => {
      // get Tratamientos
      axios
        .get(baseURL + "api/getAllRecord")
        .then((response) => {
          //console.log(response.data.data);
          setRecord(response.data.data);
        })
        .catch(() => {
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

  const setDeleteRecordId = async (recordID) => {
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
          axios.delete(baseURL + "api/record/" + recordID)
            .then((response) => {
              //console.log(response);
              getAllRecord();

              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            })
            .catch(() => {
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
    getAllRecord();

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
              <CardHeader className="border-0">
                <Media className="align-items-center">
                  <Media>
                    <span className="mb-0 text-sm">
                      <h3 className="mb-0">Grabaciones</h3>
                    </span>
                  </Media>
                </Media>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Identificador</th>
                    <th scope="col">Url</th>
                    <th scope="col">Frases</th>
                    <th scope="col">Movil</th>
                    <th scope="col">Modelo Movil</th>
                    <th className=" text-right">Acci??n</th>
                  </tr>
                </thead>
                <tbody>
                  {record.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <span className="mb-0 text-sm">
                            {item.phrase_id === null ? "Demo" : item.name}
                          </span>
                        </Media>
                      </th>
                      <th>{item.path.split("/")[4].split("-")[0]}</th>
                      <td>
                        <audio controls="controls">
                          <source src={item.path} type="audio/mp4" />
                        </audio>
                      </td>
                      <td>
                        <div className="avatar-group">
                          {/*item.specialist_id.map((user) => (
                                <>
                                  <Link
                                    className="avatar avatar-sm"
                                    to={"/admin/user-profile/" + user.id}
                                    id={user.name.split(" ")[0]}
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
                                    delay={user.id}
                                    target={user.name.split(" ")[0]}
                                  >
                                    {user.name.split(" ")[0]}
                                  </UncontrolledTooltip>
                                </>
                              ))*/}

                          {item.phrase_id}
                        </div>
                      </td>
                      <td>{item.devices.brand}</td>
                      <td>{item.devices.manufacturer}</td>
                      <td className=" td-actions text-right">
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          <Button
                            className=" btn-icon"
                            color="info"
                            size="sm"
                            type="button"
                            id={"download"}
                          >
                            <i className=" ni ni-cloud-download-95 pt-1"></i>
                            <UncontrolledTooltip
                              delay={item.id}
                              target={"download"}
                            >
                              Original
                            </UncontrolledTooltip>
                          </Button>
                        </a>

                        <Link to="#">
                          <Button
                            className=" btn-icon"
                            color="danger"
                            size="sm"
                            type="button"
                            onClick={(e) => setDeleteRecordId(item.id)}
                            id={"delete"}
                          >
                            <i className=" ni ni-fat-remove pt-1"></i>
                            <UncontrolledTooltip
                              delay={item.id}
                              target={"delete"}
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
export default AdminRecordTableList;

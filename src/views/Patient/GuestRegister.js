/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const GuestRegister = () => {
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <strong>App TuVoz</strong>
            </div>

            <div className="text-center">
              <p>
                Muchas Gracias por formar parte del estudio de inteligibilidad
                de la voz, somos un equipo joven del grupo de VIVOLab,
                perteneciente al la Universidad de Zaragoza.
              </p>{" "}
              <br />
              <strong>
                {" "}
                Puede seguir con nuestros servicios desde la aplicación móvil.
              </strong>
            </div>
          </CardHeader>
        </Card>
      </Col>
    </>
  );
};

export default GuestRegister;

import React, { useState } from "react";

// reactstrap components
import {
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const RegisterPolicyModal = (props) => {

  const { buttonLabel } = props;

  const [modalOpen, setModalOpen] = React.useState(false);
 

  return (
    <>      
        I agree with the{" "}
        <a href="#" onClick={() => setModalOpen(!modalOpen)}>                          
          {buttonLabel}
        </a>
     

      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            {buttonLabel}
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
            <label htmlFor="exampleFormControlTextarea1">              
              <p> HOJA DE INFORMACIÓN PARA EL PARTICIPANTE 
                <br/>
              <span>______________________________________________________________</span>
              </p>
              <p>              
                TÍTULO DE LA INVESTIGACIÓN:
                <br/>
                TALENTO: Tecnologías del Habla y el Lenguaje para la Evaluación de Trastornos de la Comunicación 
                <br/>
                TÍTULO DEL ESTUDIO: 
                Estudio funcional de la voz en adultos
                <br/>
                RESPONSABLE:
                Investigador Principal: Eduardo Lleida Solano
                <br/>
                Tfno: 976 762372
                <br/>
                email: lleida@unizar.es
                <br/>
                Centro: Escuela de Ingeniería y Arquitectura              
              </p>
              <span>______________________________________________________________</span>
              <p>
              OBJETIVO DE ESTE DOCUMENTO <br/>
              El objetivo de este documento es informarle sobre el estudio que nos proponemos realizar y solicitar su participación voluntaria en el mismo. El motivo de su participación es donar su voz para formar parte de una base de datos de voces.
              Por favor, LEA a continuación la siguiente información para estar seguro/a que comprende perfectamente el objetivo de este estudio y firme en caso de que esté de acuerdo en participar en el mismo. Si tiene cualquier duda, puede hacernos cuantas preguntas precise, o puede consultar con alguien más sobre su participación en el mismo.
              Su participación es totalmente voluntaria, puede decidir no participar o retirarse del estudio en cualquier momento sin tener que dar explicaciones. Basta con que le manifieste su intención al investigador principal del estudio.

              <br/><br/>OBJETIVO DEL ESTUDIO <br/>
              Tal y como se le ha informado, este estudio se incluye dentro del proyecto THALENTO y pretende estudiar y automatizar los procedimientos de valoración de la calidad de voz. El resultado de este estudio será una base de datos de voces que se pondrá a disposición de la comunidad científica, y un conjunto de herramientas software de ayuda a la valoración de la calidad de la voz. 
              Puede encontrar más información sobre el proyecto THALENTO en la página web del proyecto http://vivolab.unizar.es/thalento.html 

              <br/><br/>PROCEDIMIENTOS<br/>
              Si usted acepta participar en este estudio, se recabarán los siguientes datos de su historial clínico:
              Edad
              Sexo
              Fumador/no fumador
              Profesional de la voz (profesor, locutor, ...) o no
              Patología

              Se le realizarán las siguientes grabaciones:
              Leer un conjunto de 200 frases a través de un teléfono móvil

              <br/><br/>COSTE/COMPENSACIÓN<br/>
              No existe ningún coste por participar en este estudio. Todas las entrevistas y pruebas que se realicen durante el estudio no supondrán coste alguno para usted. No recibirá compensación económica por participar en el estudio.

              <br/><br/>CONFIDENCIALIDAD <br/>
              Toda la información recogida se tratará conforme a lo establecido en la legislación vigente en materia de protección de datos de carácter personal. En la base de datos del estudio no se incluirán datos personales: ni su nombre, ni su nº de historia clínica ni ningún dato que le pueda identificar. Se le identificará por un código que sólo el equipo investigador podrá relacionar con su nombre.

              De acuerdo a lo que establece la legislación de protección de datos, usted puede ejercer los derechos de acceso, modificación, oposición y cancelación de datos. Además, puede limitar el tratamiento de datos que sean incorrectos, solicitar una copia o que se trasladen a un tercero (portabilidad) los datos que usted ha facilitado para el estudio. Para ejercitar sus derechos, diríjase al investigador principal del estudio. Así mismo tiene derecho a dirigirse a la Agencia de Protección de Datos si no quedara satisfecho.

              Si usted decide retirar el consentimiento para participar en este estudio, ningún dato nuevo será añadido a la base de datos, pero sí se utilizarán los que ya se hayan recogido. En caso de que desee que se destruyan los datos ya recogidos debe solicitarlo expresamente y se atenderá a su solicitud.

              Los datos pueden ser transmitidos a terceros y a otros países, pero en ningún caso contendrán información que le pueda identificar directamente. En el caso de que se produzca esta cesión, será para los mismos fines del estudio descrito o para su uso en publicaciones científicas, pero siempre manteniendo la confidencialidad de los mismos de acuerdo a la legislación vigente.

              La voz es una señal biométrica característica de cada persona por dicha razón le informamos que no se puede descartar la posibilidad de reidentificación. El equipo investigador adoptará las medidas pertinentes para garantizar la protección de su privacidad y no permitirá que sus datos se crucen con otras bases de datos que pudieran permitir su identificación o que se utilicen para fines ajenos a los objetivos de esta investigación.

              Las conclusiones del estudio se presentarán en congresos y publicaciones científicas, pero se harán siempre con datos agrupados y nunca se divulgará nada que le pueda identificar.

              La base de datos en ningún caso y circustancia estará almacenada en un servidor público. La copia original de la base de datos se almacenará en la intranet (red privada) que el grupo de investigación Vivolab dispone en el edificio Betancourt del Campus Río Ebro de la Universidad de Zaragoza. En el acuerdo de licencia gratuita con otros grupos de investigación se indica claramente la prohibición de almacenar la base de datos en un servidor público y la desanonimización de los datos.

              <br/><br/>RESULTADOS DEL ESTUDIO<br/>
              Usted puede seguir los resultados del proyecto a través de la página web http://vivolab.unizar.es/thalento.html

              </p>
            </label>            
           
          </FormGroup>
        </ModalBody>
        <ModalFooter>          
          <Button
            color="primary"
            type="button"            
            onClick={() => setModalOpen(!modalOpen)}
          >
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default RegisterPolicyModal;

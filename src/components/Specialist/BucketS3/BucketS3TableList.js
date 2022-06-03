import React, { useEffect, useState } from "react";

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
} from "reactstrap";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import useBaseURL from "../../../Hooks/useBaseURL";
import ChartModal from "./ChartModal";
import AWS from "aws-sdk";
import useFormatterDate from '../../../Hooks/useFormatterDate';

const cookie = new Cookies();

const params = {
  accessKeyId:"AKIA4RAX6HMDBWHHFTND",
  secretAccessKey:"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",
  Bucket:"tuvoz-bucket",
  signatureVersion:"v4",
  region: 'eu-central-1',
  apiVersion: '2006-03-01',
  
} 


const s3Bucket= new AWS.S3(params);


const BucketS3 = () => {
  //uso del Hooks para la url de la API
  const baseURL = useBaseURL(null);
  const formatter = new useFormatterDate();


  //gusrdar los tratamientos del Usuario Logueado
  const [record, setRecord] = useState([
    {
      Key: 'recording-f841ee41-ce59-400d-a569-130ffbe78f6f.m4a',
      LastModified: "Fri Jun 03 2022 14:00:04 GMT+0200 (hora de verano de Europa central)",
      ETag: '"9af1b0758fd09eb4902078246b0adfb1"',
      ChecksumAlgorithm: Array(0),
      Size: 22550,
      StorageClass: "STANDARD",
    },
 
  ]);
  
  const listObjectsInBucket = async () => {

    // Call S3 to obtain a list of the objects in the bucket
    s3Bucket.listObjects({Bucket:params.Bucket} ,function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {

        let aux = Array();
        data.Contents.map((element, index) => {
          if (index % 2 === 0) {
            aux.push({
              metadato:element.Key,
              record:data.Contents[index+1].Key,
              date: formatter.format(Date.parse(element.LastModified)) ,
              size:element.Size + data.Contents[index+1].Size,
            });
          }
          
          
        });
        setRecord(aux)
      }
    }); 

  }

  const downloadS3 = (item)=>{

    s3Bucket.getObject({Bucket:params.Bucket, Key: item}, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        const json = JSON.stringify(data.Body.toString());
        console.log(json);
        //console.log(data.Body.toString());
        
      }
    });
  }

  useEffect(() => {
    
    listObjectsInBucket()


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
                    <th scope="col">Metadatos</th>
                    <th scope="col">Audio</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Tamaño</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {record.map((item, index) => (                    
                    <>
                      <tr key={index}>
                        <th scope="row">
                        <div className="avatar-group" onClick={()=>downloadS3(item.metadato)} >
                            {item.metadato}
                          </div>
                        </th>
                        <td>
                          <div className="avatar-group" onClick={()=>downloadS3(item.record)}>
                            {item.record}
                          </div>
                        </td>
                        <td>
                          <div >
                            {item.date}
                          </div>
                        </td>
                        <td>
                          <div>
                            {(item.size / 1024).toFixed(2) +"Kb"}
                          </div>
                        </td>
                      </tr>
                    </>
                   
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
export default BucketS3;

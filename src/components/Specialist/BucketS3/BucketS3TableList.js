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
  Button,
  Badge,
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
  const hostS3= "https://tuvoz-bucket.s3.eu-central-1.amazonaws.com/";
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
  const [users, setUsers] = useState([ ]);
  //paginations
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);

  const filterArray=(inputArr)=>{
    var found ={};
    var out = inputArr.filter(function(element){
        return found.hasOwnProperty(element)? false : (found[element]=true);
    });    
    return out;
  }

  const listObjectsInBucket = async () => {

    // Call S3 to obtain a list of the objects in the bucket
    s3Bucket.listObjects({Bucket:params.Bucket} ,function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        
        let aux = Array();
        let auxUser = Array();
        data.Contents.map((element, index) => {
          if (index % 2 === 0) {
            aux.push({
              metadato:element.Key,
              record:data.Contents[index+1].Key,
              date: formatter.format(Date.parse(element.LastModified)) ,
              size:element.Size + data.Contents[index+1].Size,
            });
            auxUser.push(element.Key.split("(")[0]);                     
          }
        });
        setRecord(aux);
        setUsers(filterArray(auxUser));              
        const porcentPage = 0.1; //10%
        setPageSize(Math.ceil(aux.length * porcentPage));
        setPagesCount(Math.ceil(aux.length / (aux.length * porcentPage)));                
      }
    }); 

  }

  const downloadS3 = async(item)=>{    
    
    let resp = await fetch(hostS3+item.metadato);
    let body = await resp.blob();      
    let url = window.URL.createObjectURL(body);
    let tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', item.metadato);
    tempLink.click();

    resp = await fetch(hostS3+item.record);
    body = await resp.blob();      
    url = window.URL.createObjectURL(body);
    tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', item.record);
    tempLink.click();
  }

  const downloadDataset = async()=>{    
    record.map((item) => {
       downloadS3(item);
  });
    
  }

  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
 };

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
                    <Badge color="primary" >{record.length}</Badge>
                  </Media>
                </Media>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Metadatos</th>
                    <th scope="col">Audio</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Tamaño</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {record.slice(currentPage * pageSize, (currentPage + 1) * pageSize ).map((item, index) => (                    
                    <>
                      <tr key={index}>
                        <th scope="row" onClick={()=>downloadS3(item)} >
                          <i className="fas fa-angle-down" />
                          <span className="sr-only">Previous</span>
                        </th>
                        <td>
                        <div className="avatar-group" >
                            {item.metadato}
                          </div>
                        </td>
                        <td>
                          <div className="avatar-group" >
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
                <Button className="btn-icon btn-3" color="primary" type="button" onClick={()=>downloadDataset()}>
                  <span className="btn-inner--icon">
                    <i className="ni ni-bag-17" />
                  </span>
                  <span className="btn-inner--text">DataSet</span>
                </Button>
                </nav>
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem disabled={currentPage <= 0}>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => handlePageClick(e, currentPage - 1)}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    {[...Array(pagesCount)].map((page, i) => 
                      <PaginationItem active={i === currentPage} key={i}>
                        <PaginationLink onClick={e => handlePageClick(e, i)} href="#">
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}                                          
                    <PaginationItem disabled={currentPage >= pagesCount - 1}>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => handlePageClick(e, currentPage + 1)}
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

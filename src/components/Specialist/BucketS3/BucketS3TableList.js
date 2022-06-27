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
import PraatChartModal from "./PraatChartModal";
import SoundModal from "./SoundModal";
import AWS from "aws-sdk";
import useFormatterDate from '../../../Hooks/useFormatterDate';
import JSZip  from "jszip";
import { saveAs } from 'file-saver';

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
      metadato: 'recording-f841ee41-ce59-400d-a569-130ffbe78f6f.json',
      record: 'recording-f841ee41-ce59-400d-a569-130ffbe78f6f.m4a',
      date: "21 junio de 2022" ,
      size: 22550,
    },
 
  ]);
  const [users, setUsers] = useState([ ]);
  const [isLoading, setIsLoading] = useState(false);
  
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
            auxUser.push(element.Key.split("_")[0]);                     
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

  const getBlob = async(item) =>{
    let resp = await fetch(hostS3+item.metadato);
    let metadata = await resp.blob();  

    resp = await fetch(hostS3+item.record);
    let record = await resp.blob(); 
    return [metadata, record];
  }

  const downloadDataset = async()=>{   
    try {
        setIsLoading(true)
        let zip = new JSZip(); 

        for (let i = 0; i < users.length; i++) {
            const user = users[i];        
            for (let j = 0; j < record.length; j++) {
              const item = record[j];

              if (item.metadato.split("_")[0] === user) {
                let audio = zip.folder(user);
      
                let tuvoz = await getBlob(item);
                
                let metadata =tuvoz[0]; 
                let record = tuvoz[1]; 

                audio.file(item.metadato, metadata);
                audio.file(item.record, record); 
                
              }
              
            }
        }

        zip.generateAsync({type:"blob"}).then(function(content) {
          // see FileSaver.js
          saveAs(content, "dataset_TuVoz.zip");
        });
    }
    catch(error){
      Swal.fire({
        title: "Oops!!",
        text: "Credentials went wrong!",
        icon: "error",
        footer: '<span style="color: red">server with error!<span/>',
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 4000,
      });
    
    }
    finally{
      setIsLoading(false)
    }  
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
                      <Media style={{marginLeft: 450}}>
                        <span className="mb-0 text-sm">
                          <h3 className="mb-0">Pacientes</h3>
                        </span>
                        <Badge color="primary" >{record.length /10}</Badge>
                      </Media>

                      <Button style={{marginLeft: 550}} className="btn-icon btn-3 " color="primary" type="button" onClick={()=>downloadDataset()}>
                        <span className="btn-inner--icon">
                          <i className="ni ni-bag-17" />
                        </span>
                        <span className="btn-inner--text">DataSet</span>
                      </Button>
                    </Media>

                    
                  </CardHeader>
                  {!isLoading ?(
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Opción</th>
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
                              <th scope="row">                                
                                <Media className="align-items-left">
                                  <span className="mb-0 text-sm">
                                    <PraatChartModal buttonLabel="Detalles" blob={item.record}></PraatChartModal>
                                  </span>
                               
                                  <span className="mb-0 text-sm">
                                  <Button
                                    className="btn-icon icon-shape bg-blue text-white rounded-circle shadow"
                                    style={{padding:"5px"}}
                                    outline
                                    color="secundary"
                                    type="button" 
                                    onClick={()=>downloadS3(item)}                                   
                                  >
                                    <span className="btn-inner--icon">
                                    <i className="ni ni-cloud-download-95" />
                                    </span>  
                                    
                                  </Button>
                                  </span>
                                </Media>
                              </th>
                              
                              <td>
                              <div className="avatar-group" >
                                  {item.metadato}
                                </div>
                              </td>
                              <td>
                                <div className="avatar-group" >
                                <Media className="align-items-center">
                                  <span className="mb-0 text-sm">
                                    <SoundModal buttonLabel="Metadatos" blob={item}></SoundModal>                                   
                                    {"    "}{item.record}
                                  </span>
                                </Media>
                                  
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
                    ): (
                      <Table className="align-items-center table-flush" responsive>
                        <div className="col">
                          <div className="align-items-center"> Loading...</div>
                        </div>
                      </Table>
            
                    )}
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

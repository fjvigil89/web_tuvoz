import { useState } from "react";

const useBaseURL = (urlApi) => {
  //const [url, setUrl] = useState("http://192.168.1.37:8000/");
  //const [url, setUrl] = useState("http://192.168.100.130:8000/");
  const [url, setUrl] = useState("http://localhost:8000/");
  //const [url, setUrl] = useState("http://155.210.153.12:8080/");

  if (urlApi !== null) {
    setUrl(urlApi);
  }
  return url;
};
export default useBaseURL;

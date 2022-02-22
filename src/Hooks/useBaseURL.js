import { useState } from "react";
require('dotenv').config()

const useBaseURL = (urlApi) => {
  const [url, setUrl] = useState(process.env.REACT_APP_API_URL);  
  
  if (urlApi !== null) {
    setUrl(urlApi);
  }
  return url;
};
export default useBaseURL;

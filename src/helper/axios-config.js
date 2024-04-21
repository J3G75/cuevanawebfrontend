import axios from "axios";

const axiosIntance=axios.create({
   baseURL:'https://webcuevana.onrender.com' 
});

export{
    axiosIntance,
}
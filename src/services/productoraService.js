import{ axiosIntance }from '../helper/axios-config';

const obtenerProductora=()=>{
    return axiosIntance.get('productora',{
        headers:{
            'Content-Type':'application/json'
        }
    });
}

const crearProductora=(data)=>{
    return axiosIntance.post('productora', data,{
        headers:{
            'Content-Type':'application/json'  
        }
    });
}

const editarProductora=(productoraId,data)=>{
    return axiosIntance.put(`productora/${productoraId}`, data,{
        headers:{
            'Content-Type':'application/json'  
        }
    });
}

export{
    obtenerProductora,crearProductora,editarProductora
}
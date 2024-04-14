import{ axiosIntance }from '../helper/axios-config';

const obtenerGenero=()=>{
    return axiosIntance.get('genero',{
        headers:{
            'Content-Type':'application/json'
        }
    });
}

const crearGenero=(data)=>{
    return axiosIntance.post('genero', data,{
        headers:{
            'Content-Type':'application/json'  
        }
    });
}

const editarGenero=(generoId,data)=>{
    return axiosIntance.put(`genero/${generoId}`, data,{
        headers:{
            'Content-Type':'application/json'  
        }
    });
}

export{
    obtenerGenero,crearGenero,editarGenero
}
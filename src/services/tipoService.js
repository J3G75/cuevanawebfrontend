import{ axiosIntance }from '../helper/axios-config';

const obtenerTipo=()=>{
    return axiosIntance.get('tipo',{
        headers:{
            'Content-Type':'application/json'
        }
    });
}

const crearTipo=(data)=>{
    return axiosIntance.post('tipo', data,{
        headers:{
            'Content-Type':'application/json'  
        }
    });
}

const editarTipo=(tipoId,data)=>{
    return axiosIntance.put(`tipo/${tipoId}`, data,{
        headers:{
            'Content-Type':'application/json'  
        }
    });
}

export{
    obtenerTipo,crearTipo,editarTipo
}
import{ axiosIntance }from '../helper/axios-config';

const obtenerUsuario=()=>{
    return axiosIntance.get('usuario',{
        headers:{
            'Content-Type':'application/json'
        }
    });
}

const crearUsuario=(data)=>{
    return axiosIntance.post('usuario', data,{
        headers:{
            'Content-Type':'application/json'  
        }
    });
}

const editarUsuario=(usuarioId,data)=>{
    return axiosIntance.put(`usuario/${usuarioId}`, data,{
        headers:{
            'Content-Type':'application/json'  
        }
    });
}

export{
    obtenerUsuario,crearUsuario,editarUsuario
}
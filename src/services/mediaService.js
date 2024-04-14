import{ axiosIntance }from '../helper/axios-config';

const obtenerMedias=()=>{
    return axiosIntance.get('media',{
        headers:{
            'Content-Type':'application/json'
        }
    });
}

const crearMedia=(data)=>{
    return axiosIntance.post('media', data,{
        headers:{
            'Content-Type':'application/json'  
        }
    });
}

const editarMedia=(mediaId,data)=>{
    return axiosIntance.put(`media/${mediaId}`, data,{
        headers:{
            'Content-Type':'application/json'  
        }
    });
}

const obtenerMediaPorId=(mediaId)=>{
    return axiosIntance.get(`media/${mediaId}`,{
        headers:{
            'Content-Type':'application/json' 
        }
    });
}

export{
    obtenerMedias,crearMedia,editarMedia,obtenerMediaPorId
}
import{ axiosIntance }from '../helper/axios-config';

const obtenerDirector=()=>{
    return axiosIntance.get('director',{
        headers:{
            'Content-Type':'application/json'
        }
    });
}

const crearDirector=(data)=>{
    return axiosIntance.post('director', data,{
        headers:{
            'Content-Type':'application/json'  
        }
    });
}

const editarDirector=(directorId,data)=>{
    return axiosIntance.put(`director/${directorId}`, data,{
        headers:{
            'Content-Type':'application/json'  
        }
    });
}

export{
    obtenerDirector,crearDirector,editarDirector
}
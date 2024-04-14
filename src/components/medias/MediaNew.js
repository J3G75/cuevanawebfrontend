import React,{useState,useEffect} from 'react'
import{obtenerDirector} from '../../services/directorService';
import{obtenerGenero} from '../../services/generoService';
import{obtenerProductora} from '../../services/productoraService';
import{obtenerTipo} from '../../services/tipoService';
import{crearMedia} from '../../services/mediaService';
import Swal from 'sweetalert2';



export const MediaNew = ({ handleOpenModal, listarMedias }) => {

    const[directores,setDirectores]=useState([]);
    const[generos,setGeneros]=useState([]);
    const[productoras,setProductoras]=useState([]);
    const[tipos,setTipos]=useState([]);
    const[valoresForm, setValoresForm]=useState([]);
    const{serial, titulo, tipo, productora, imagen, anoEstreno, director, genero, url, sinopsis}=valoresForm;

    const listarDirectores=async()=>{
        try {
            const{data}=await obtenerDirector();
            setDirectores(data);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        listarDirectores();
    },[]);

    const listarGeneros=async()=>{
        try {
            const{data}=await obtenerGenero();
            setGeneros(data);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        listarGeneros();
    },[]);

    const listarProductoras=async()=>{
        try {
            const{data}=await obtenerProductora();
            setProductoras(data);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        listarProductoras();
    },[]);

    const listarTipos=async()=>{
        try {
            const{data}=await obtenerTipo();
            setTipos(data);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        listarTipos();
    },[]);

    const handleOnChange=({target})=>{
        const{name,value}=target;
        setValoresForm({...valoresForm,[name]:value});
    }

    const handleOnSubmit=async(e)=>{
        e.preventDefault();
        const media={
            serial, 
            titulo,
            tipo:
            {
                _id:tipo
            }, 
            productoraPrincipal:{
                _id:productora
            }, 
            imagen, 
            anoEstreno, 
            directorPrincipal:{
                _id:director
            }, 
            generoPrincipal:{
                _id:genero
            }, 
            url, 
            sinopsis  
        }

        console.log(media);
        try{
            Swal.fire({
                allowOutsideClick:false,
                text:'...Cargando'
            });
            Swal.showLoading();
            const{data}=await crearMedia(media);
            handleOpenModal();
            listarMedias();
            Swal.close();
        } catch(error){
            console.log(error);
            Swal.close();
        }
    }

    return (
        <div className='sidebar'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3>Nueva Media</h3>
                            <i className="fa-solid fa-xmark" on onClick={handleOpenModal}></i>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <hr />
                        </div>
                    </div>
                    <form onSubmit={(e)=>handleOnSubmit(e)}>
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Serial</label>
                                    <input type="text" name='serial' value={serial} onChange={e=>handleOnChange(e)}required className='form-control' />
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Titulo</label>
                                    <input type="text" name='titulo'value={titulo} onChange={e=>handleOnChange(e)}required className='form-control' />
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Tipo</label>
                                    <select className='form-select' name='tipo' value={tipo} onChange={e=>handleOnChange(e)} required>
                                        <option value="">--SELECCIONE--</option>
                                        {
                                            tipos.map(({_id, nombre})=>{
                                                return<option key={_id} value={_id}>{nombre}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Productora</label>
                                    <select className='form-select' name='productora' value={productora} onChange={e=>handleOnChange(e)} required>
                                        <option value="">--SELECCIONE--</option>
                                        {
                                            productoras.map(({_id, nombre})=>{
                                                return<option key={_id} value={_id}>{nombre}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Imagen</label>
                                    <input type="text" name='imagen' value={imagen} onChange={e=>handleOnChange(e)} required className='form-control'/>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Año Estreno</label>
                                    <input type="text" name='anoEstreno' value={anoEstreno} onChange={e=>handleOnChange(e)} required className='form-control' />
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Director</label>
                                    <select className='form-select' name='director' value={director} onChange={e=>handleOnChange(e)} required>
                                        <option value="">--SELECCIONE--</option>
                                        {
                                            directores.map(({_id, nombre})=>{
                                                return<option key={_id} value={_id}>{nombre}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Genero</label>
                                    <select className='form-select' name='genero'value={genero} onChange={e=>handleOnChange(e)} required>
                                        <option value="">--SELECCIONE--</option>
                                        {
                                            generos.map(({_id, nombre})=>{
                                                return<option key={_id} value={_id}>{nombre}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">URL</label>
                                    <input type="text" name='url' value={url} onChange={e=>handleOnChange(e)} required className='form-control' />
                                </div>
                            </div>

                            <div className='col'>
                                <div className="mb-3">
                                    <label className="form-label">Sinopsis</label>
                                    <input type="text" name='sinopsis' value={sinopsis} onChange={e=>handleOnChange(e)} required className='form-control'/>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <button className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}



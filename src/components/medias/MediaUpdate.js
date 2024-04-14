import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import{obtenerMediaPorId,editarMedia}from '../../services/mediaService';
import{obtenerDirector} from '../../services/directorService';
import{obtenerGenero} from '../../services/generoService';
import{obtenerProductora} from '../../services/productoraService';
import{obtenerTipo} from '../../services/tipoService';
import Swal from 'sweetalert2'

export const MediaUpdate = () => {

const{mediaId=''}=useParams();
const[media,setMedia]=useState([]);
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

const obtenerMedia=async()=>{
  try {
    Swal.fire({
      allowOutsideClick:false,
      text:'Cargando...'
    });
    Swal.showLoading();
    const{data}=await obtenerMediaPorId(mediaId);
    console.log(data);
    setMedia(data);
    Swal.close();
  } catch (error) {

    console.log(error);
    Swal.close();
    
  }
}

useEffect(()=>{
  obtenerMedia(); 
},[mediaId])

useEffect(()=>{
  if(media){
    setValoresForm({
      serial:media.serial,
      titulo:media.titulo,
      tipo:media.tipo,
      productora:media.productoraPrincipal,
      imagen:media.imagen,
      anoEstreno:media.anoEstreno,
      director:media.directorPrincipal,
      genero:media.generoPrincipal,
      url:media.url,
      sinopsis:media.sinopsis
    })
  }
},[media])

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
      const{data}=await editarMedia(mediaId,media);
      Swal.close();
  } catch(error){
      console.log(error);
      console.log(Error.response.data);
      Swal.close();
      let mensaje;
      if(error&&error.response&&error.response.data){
        mensaje=error.response.data;
      }
        else{
          mensaje="Ocurrió un error, por favor intente de nuevo";
        }
      Swal.fire('Error', 'Ocurrio un error, por favor verifique los datos', 'error');
  }
}


  return (
    <div className='container-fluid mt-3 mb-2'>
      <div className="card">
        <div className='card-header'>
          <h5 className='card-title'>Detalle Activo</h5>
        </div>
        <div className="card-body">
          <div className='row'>
            <div className='col-md-4'>
              <img src={media?.imagen} />
            </div>
            <div className='col-md-8'>
              <form onSubmit={(e)=>handleOnSubmit(e)}>
                <div className='row'>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Serial</label>
                      <input type="text" name='serial' value={serial} onChange={e => handleOnChange(e)} required className='form-control' />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Titulo</label>
                      <input type="text" name='titulo' value={titulo} onChange={e => handleOnChange(e)} required className='form-control' />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Tipo</label>
                      <select className='form-select' name='tipo' value={tipo} onChange={e => handleOnChange(e)} required>
                        <option value="">--SELECCIONE--</option>
                        {
                          tipos.map(({ _id, nombre }) => {
                            return <option key={_id} value={_id}>{nombre}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Productora</label>
                      <select className='form-select' name='productora' value={productora} onChange={e => handleOnChange(e)} required>
                        <option value="">--SELECCIONE--</option>
                        {
                          productoras.map(({ _id, nombre }) => {
                            return <option key={_id} value={_id}>{nombre}</option>
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
                      <input type="text" name='imagen' value={imagen} onChange={e => handleOnChange(e)} required className='form-control' />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Año Estreno</label>
                      <input type="text" name='anoEstreno' value={anoEstreno} onChange={e => handleOnChange(e)} required className='form-control' />
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Director</label>
                      <select className='form-select' name='director' value={director} onChange={e => handleOnChange(e)} required>
                        <option value="">--SELECCIONE--</option>
                        {
                          directores.map(({ _id, nombre }) => {
                            return <option key={_id} value={_id}>{nombre}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Genero</label>
                      <select className='form-select' name='genero' value={genero} onChange={e => handleOnChange(e)} required>
                        <option value="">--SELECCIONE--</option>
                        {
                          generos.map(({ _id, nombre }) => {
                            return <option key={_id} value={_id}>{nombre}</option>
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
                      <input type="text" name='url' value={url} onChange={e => handleOnChange(e)} required className='form-control' />
                    </div>
                  </div>

                  <div className='col'>
                    <div className="mb-3">
                      <label className="form-label">Sinopsis</label>
                      <input type="text" name='sinopsis' value={sinopsis} onChange={e => handleOnChange(e)} required className='form-control' />
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
      </div>
    </div>
  )
}


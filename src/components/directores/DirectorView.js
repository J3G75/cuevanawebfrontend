import React, { useState, useEffect } from 'react'
import { obtenerDirector } from '../../services/directorService';
import { crearDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const DirectorView = () => {
  const [valoresForm, setValoresForm] = useState([]);
  const [directores, setDirectores] = useState([]);
  const { nombre, estado } = valoresForm;


  const listarDirectores = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      const resp = await obtenerDirector();
      setDirectores(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error)
      Swal.close();
    }
  }

  useEffect(() => {
    listarDirectores();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value })
  }

  const handleCrearDirector = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await crearDirector(valoresForm);
      setValoresForm({ nombre: '', estado: '' });
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearDirector(e)}>
        <div className='row'>
          <div className='col-lg-6'>
            <div className="mb-2">
              <label className="form-label">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control" onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className='col-lg-6'>
            <div className="mb-2">
              <label className="form-label">Estado</label>
              <select required name='estado' value={estado} className='form-select' onChange={(e)=>handleOnChange(e)}>
                <option selected>--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        </div>

        <button className="btn btn-primary">Guardar</button>
      </form>

      <table className='table'>
        <thead>
          <tr>
            <th scope='row'>#</th>
            <td scope='col'>Nombre</td>
            <td scope='col'>Estado</td>
            <td scope='col'>Fecha Creación</td>
            <td scope='col'>Fecha Actualización</td>
          </tr>
        </thead>
        <tbody>
          {
            directores.length > 0 && directores.map((director, index) => {
              return <tr>
                <th scope='row'>{index + 1}</th>
                <td>{director.nombre}</td>
                <td>{director.estado}</td>
                <td>{moment(director.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(director.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

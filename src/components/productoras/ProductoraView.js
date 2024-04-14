import React, { useState, useEffect } from 'react'
import { obtenerProductora } from '../../services/productoraService';
import { crearProductora } from '../../services/productoraService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const ProductoraView = () => {
  const [valoresForm, setValoresForm] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const { nombre, descripcion,slogan, estado } = valoresForm;


  const listarProductoras = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      const resp = await obtenerProductora();
      setProductoras(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error)
      Swal.close();
    }
  }

  useEffect(() => {
    listarProductoras();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value })
  }

  const handleCrearProductora = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const resp = await crearProductora(valoresForm);
      setValoresForm({ nombre: '',descripcion:'', slogan:'',estado: '' });
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearProductora(e)}>
        <div className='row'>
          <div className='col-lg-3'>
            <div className="mb-4">
              <label className="form-label">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control" onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className='col-lg-3'>
            <div className="mb-4">
              <label className="form-label">Descripción</label>
              <input required name='descripcion' value={descripcion} type="text" className="form-control" onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className='col-lg-3'>
            <div className="mb-4">
              <label className="form-label">Slogan</label>
              <input required name='slogan' value={slogan} type="text" className="form-control" onChange={(e) => handleOnChange(e)} />
            </div>
          </div>
          <div className='col-lg-3'>
            <div className="mb-4">
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
            <td scope='col'>Descripción</td>
            <td scope='col'>Slogan</td>
            <td scope='col'>Estado</td>
            <td scope='col'>Fecha Creación</td>
            <td scope='col'>Fecha Actualización</td>
          </tr>
        </thead>
        <tbody>
          {
            productoras.length > 0 && productoras.map((productora, index) => {
              return <tr>
                <th scope='row'>{index + 1}</th>
                <td>{productora.nombre}</td>
                <td>{productora.descripcion}</td>
                <td>{productora.slogan}</td>
                <td>{productora.estado}</td>
                <td>{moment(productora.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                <td>{moment(productora.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}


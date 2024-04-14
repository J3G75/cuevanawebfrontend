import React from 'react'
import { Link } from 'react-router-dom';

export const MediaCard = (props) => {
    const{media}=props;

  return (
      <div className="col-sm-6 my-3 d-flex align-items-stretch">
          <div className="card">
              <img src={media.imagen} className="card-img-top" alt="Image" />
              <div className="card-body">
                  <h5 className="card-title">Información</h5>
                  <hr/>
                  <p className="card-text">{`Serial: ${media.serial}`}</p>
                  <p className="card-text">{`Titulo: ${media.titulo}`}</p>
                  <p className="card-text text-truncate">{`Sinopsis: ${media.sinopsis}`}</p>
                  <p className="card-text">{`Año de Estreno: ${media.anoEstreno}`}</p>
                  <p className="card-text">{`Director: ${media.directorPrincipal.nombre}`}</p>
                  <p className="card-text">{`Genero: ${media.generoPrincipal.nombre}`}</p>
                  <p className="card-text">{`Productora: ${media.productoraPrincipal.nombre}`}</p>
                  <p className="card-text">{`Tipo: ${media.tipo.nombre}`}</p>
                  <p className="card-text">
                        <Link to={`medias/edit/${media._id}`}>Ver más...</Link>
                  </p>
              </div>
          </div>
      </div>
  )
}


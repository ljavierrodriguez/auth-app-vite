import React, { useContext, useEffect, useState } from 'react'
import * as dispatch from '../services/dispatch.services';
import { Context } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Dispatch = () => {
  const { store } = useContext(Context);
  const [despachos, setDespachos] = useState(null);

  useEffect(() => {
    obtenerDespachos();
  }, [store])

  const obtenerDespachos = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': store.user?.access_token
      }
    }
    const url = `${process.env.API_URL}/api/dispatch`;
    const responseDispatches = dispatch.listDispatches(url, options)

    responseDispatches.then((data) => {
      console.log(data)
      setDespachos(data)
    })

  }

  return (
    <div className='container mt-4'>
      <table className='table table-bordered w-75 mx-auto'>
        <thead>
          <tr>
            <th>Numero</th>
            <th>Cliente</th>
            <th>Monto</th>
            <th>Peso</th>
            <th>Oficina</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            !!despachos &&
            despachos.data?.length > 0 &&
            despachos.data.map((factura, i) => {
              return (
                <tr key={i}>
                  <td>{factura.invoices_id}</td>
                  <td>{factura.client}</td>
                  <td>{factura.amount}</td>
                  <td>{factura.weight}</td>
                  <td>{factura.office}</td>
                  <td><Link className='btn btn-sm btn-info' to={`/despachos/${factura._id}/edit`}>Edit</Link></td>
                  <td><Link className='btn btn-sm btn-danger' to={`/despachos/${factura._id}/delete`}>Delete</Link></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Dispatch
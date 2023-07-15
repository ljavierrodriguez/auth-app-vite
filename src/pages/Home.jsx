import React, { useContext, useState } from 'react'
import * as dispatch from '../services/dispatch.services';
import { Context } from '../context/AppContext';

const Home = () => {

  const { store } = useContext(Context)

  const [facturas, setFacturas] = useState([
    { invoices_id: 1, client: 'DHL', amount: 122000, weight: 120 },
    { invoices_id: 2, client: 'TOTTUS', amount: 15000, weight: 120 },
    { invoices_id: 3, client: 'AMAZON', amount: 42000, weight: 120 },
  ]);

  const [selectedFactura, setSelectedFactura] = useState(null);

  const [office, setOffice] = useState("");

  const dispatchInvoice = factura => {
    const invoice = {
      invoices_id: factura.invoices_id,
      client: factura.client,
      amount: factura.amount,
      weight: factura.weight,
      office: office,
      users_id: store.user?.user?._id
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(invoice),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': store.user?.access_token
      }
    }
    //console.log(invoice);
    //console.log(store);
    const url = `${process.env.API_URL}/api/dispatch`;
    const responseDispatcher = dispatch.saveDispatch(url, options)

    responseDispatcher.then((data) => {
      if (data.status === 201) {
        alert(data.message)
        setOffice("");
        setSelectedFactura(null);
      }
    })
  }

  return (
    <>
      <div className='container mt-4'>
        <table className='table table-bordered w-75 mx-auto'>
          <thead>
            <tr>
              <th>Numero</th>
              <th>Cliente</th>
              <th>Monto</th>
              <th>Peso</th>
              <th width="10%">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              facturas.map((factura, i) => {
                return (
                  <tr key={i}>
                    <td>{factura.invoices_id}</td>
                    <td>{factura.client}</td>
                    <td>{factura.amount}</td>
                    <td>{factura.weight}</td>
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => setSelectedFactura(factura)} data-bs-target="#exampleModal" data-bs-toggle="modal">Despachar</button>
                      {/* <button className="btn btn-warning btn-sm" onClick={() => dispatchInvoice(factura)}>Despachar</button> */}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-2">
                    <label htmlFor="office" className="form-label">Office</label>
                    <input type="text" className="form-control" id='office' name="office" value={office} onChange={(e) => setOffice(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={() => dispatchInvoice(selectedFactura)}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
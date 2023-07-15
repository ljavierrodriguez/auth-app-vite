import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import * as dispatch from '../services/dispatch.services';
import moment from 'moment';

const DispatchEdit = () => {

    const { store } = useContext(Context);
    const [despacho, setDespacho] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        obtenerDespacho(id)
    }, [store, id])

    const obtenerDespacho = (id) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': store.user?.access_token
            }
        }

        const url = `${process.env.API_URL}/api/dispatch/${id}`;

        const responseDistpach = dispatch.getDispatchById(url, options);

        responseDistpach.then((data) => {
            if (data._id) {
                setDespacho(data)
            }
        })
    }

    const handleChange = e => {
        const { name, value } = e.target;
        const updateDespacho = {...despacho};
        updateDespacho[name] = value;
        setDespacho(updateDespacho);
    }

    const handleSubmit = e => {
        e.preventDefault();


        const options = {
            method: 'PUT',
            body: JSON.stringify(despacho),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': store.user?.access_token
            }
        }

        const url = `${process.env.API_URL}/api/dispatch/${id}`;

        const responseDistpach = dispatch.updateDispatch(url, options);

        responseDistpach.then((data) => {
            if (data.status === 200) {
                setDespacho(data.data)
                alert(data.message);
            }
        })


    }


    return (
        <>
        <div>Despacho: {id}</div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2>Editar Despacho</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="form-group mb-3 col-md-6">
                                <label htmlFor="invoices_id" className="form-label">Numero</label>
                                <input type="text" className="form-control" id="invoices_id" name="invoices_id" value={despacho?.invoices_id} onChange={handleChange} />
                            </div>
                            <div className="form-group mb-3 col-md-6">
                                <label htmlFor="client" className="form-label">Cliente</label>
                                <input type="text" className="form-control" id="client" name="client" value={despacho?.client} onChange={handleChange} />
                            </div>
                            <div className="form-group mb-3 col-md-6">
                                <label htmlFor="client" className="form-label">Monto (CLP)</label>
                                <input type="text" className="form-control" id="amount" name="amount" value={despacho?.amount} onChange={handleChange} />
                            </div>
                            <div className="form-group mb-3 col-md-6">
                                <label htmlFor="client" className="form-label">Peso (kgs)</label>
                                <input type="text" className="form-control" id="weight" name="weight" value={despacho?.weight}onChange={handleChange} />
                            </div>
                            <div className="form-group mb-3 col-md-6">
                                <label htmlFor="client" className="form-label">Fecha Despacho</label>
                                <input type="date" className="form-control" id="date_dispatch" name="date_dispatch" value={moment(despacho?.date_dispatch).format('YYYY-MM-DD')} onChange={handleChange} />
                            </div>
                            <div className="form-group mb-3 col-md-6">
                                <label htmlFor="client" className="form-label">Oficina</label>
                                <input type="text" className="form-control" id="office" name="office" value={despacho?.office} onChange={handleChange} />
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-warning btn-sm gap-2">UPDATE</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default DispatchEdit
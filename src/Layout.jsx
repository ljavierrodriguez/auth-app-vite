import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Menu from './components/Menu'
import ProtectedRoute from './pages/ProtectedRoute'
import injectContext, { Context } from './context/AppContext'
import Dispatch from './pages/Dispatch'
import DispatchEdit from './pages/DispatchEdit'

const Layout = () => {
    const { store } = useContext(Context);
    return (
            <BrowserRouter>
                {!!store.user && <Menu />}
                <Routes>
                    <Route path="/prueba/:id" element={<Profile />} />
                    <Route path="/despachos/:id/edit" element={<DispatchEdit />} />
                    <Route path="/despachos" element={<Dispatch />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={
                        <ProtectedRoute user={store.user}>
                            <Profile />
                        </ProtectedRoute>
                    } />
                    <Route path="/" element={
                        <ProtectedRoute user={store.user}>
                            <Home />
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
    )
}

export default injectContext(Layout)
import React, { createContext, useState } from 'react'


export const Context = createContext(null);

const injectContext = Component => {

    const AppContext = (props) => {

        const [user, setUser] = useState(null);

        const login = (credentials) => {
            if (credentials?.email === 'admin@gmail.com' && credentials?.password === '123abc') {
                setUser({
                    email: credentials?.email,
                    token: process.env.TOKEN_BSALE
                })
                return true
            } else {
                setUser(null)
                return false
            }
        }

        const logout = () => {
            setUser(null);
        }

        const data = {
            store: {
                user
            },
            actions: {
                login,
                logout
            }
        }


        return (
            <Context.Provider value={data}>
                <Component {...props} />
            </Context.Provider>
        )
    }

    return AppContext;
}

export default injectContext
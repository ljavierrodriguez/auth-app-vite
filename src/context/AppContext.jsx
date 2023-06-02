import React, { createContext, useState } from 'react'


export const Context = createContext(null);

const injectContext = Component => {

    const AppContext = (props) => {

        const [user, setUser] = useState(null);
        const [users, setUsers] = useState([
            { email: 'admin@gmail.com', password: '123abc'},
            { email: 'john.doe@gmail.com', password: 'abc123'},
            { email: 'jane.doe@gmail.com', password: '4Dm1N123'},
        ])

        const login = (credentials) => {
            const foundUser = users.find((user) => user.email === credentials.email);
            if (!foundUser) return false;
            if (credentials?.password === foundUser.password) {
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
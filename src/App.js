import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import localData from './localData.js';
import Layout from './components/Layout/Layout';
import 'fontsource-roboto';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

function App() {
    const { isAuthenticated, user } = useAuth0();
    const [user2, setUser] = useState(localData);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (user) {
            (async () => {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER_URL}/user/info`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(user),
                    }
                );

                const data = await response.json();
                setUser(data);
                console.log(data);
                if (data.isAdmin) {
                    history.push('/admin');
                } else {
                    history.push('/user');
                }
            })();
        }
        setIsLoggedIn(isAuthenticated);
    }, [setIsLoggedIn, isAuthenticated, user, history]);

    return (
        <div className='App Site'>
            <StylesProvider injectFirst>
                <Layout
                    className='Site-content'
                    user={user2}
                    setUser={setUser}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    isAdmin={isAdmin}
                    setIsAdmin={setIsAdmin}
                />
            </StylesProvider>
            <p>{JSON.stringify(user)}</p>
        </div>
    );
}

export default App;

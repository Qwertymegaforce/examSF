import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './baselayout_components/Header';
import Footer from './baselayout_components/Footer';
import { bodyDisabler } from '../../utils/functions';

const Baselayout = () => {

    let [accountState, setAccountState] = React.useState({
        token: localStorage.getItem('silant_token'),
        name: null,
        role: null
    })

    return (
        <>
            <header>
                <Header 
                    token = {accountState.token}
                    name = {accountState.name}
                    role = {accountState.role}
                    setAccountState = {setAccountState}
                />
            </header>

            <main>
                <Outlet context=
                    {
                        {
                            accountState: accountState,
                            setAccountState: setAccountState
                        }
                    }
                />
            </main>

            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default Baselayout;

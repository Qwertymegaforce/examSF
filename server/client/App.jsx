import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Baselayout from './components/baselayout/Baselayout';
import Auth from './components/auth/Auth';
import NotFound from './components/errors/NotFound';
import ControlPanel from './components/controlpanel/ControlPanel';
import MainPage from './components/mainpage/MainPage';
import DetailView from './components/detailedview/DetailView';
import MasterCreate from './components/mastercreator/MasterCreate';
import MasterEdit from './components/masteredit/MasterEdit';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/*' element={<Baselayout/>}>
                    <Route path=':umn?' element={<MainPage/>}/>
                    <Route path='controlpanel' element={<ControlPanel/>}/>
                    <Route path='authorize' element={<Auth/>}/>
                    <Route path=':instance/:id' element={<DetailView/>}/>
                    <Route path='add/:details/:id' element={<MasterCreate/>}/>
                    <Route path='edit/:details/:id' element={<MasterEdit/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import silantLogoUrl from '../../../static/images/baselogos/silant_logo.svg';
import {CONTACT_US} from '../../../utils/constants';
import teleLogoUrl from '../../../static/images/baselogos/telelogo.svg';
import {Link} from 'react-router-dom';
import AccountData from './header_components/AccountData';

const Header = (props) => {

    return (
        <>
           <div className="header_top_part_div">
                <div className="header_logo">
                    <Link to={'/'}><img src={silantLogoUrl} alt="" /></Link>
                </div>
                <div className="header_contact">
                    <p>{CONTACT_US}</p>
                    <img src={teleLogoUrl} alt="" />
                </div>

                {
                    props.token?
                    <AccountData name={props.name} role={props.role} token={props.token} setAccountState={props.setAccountState}/> 
                    :
                    <div className='header_signup'>
                        <Link to={"authorize"}><button>Авторизация</button></Link>
                    </div> 
                }

           </div>
           <div className="header_bottom_sign">
                <h1>Электронная сервисная книжка: "Мой силант"</h1>
           </div>
        </>
    );
}

export default Header;

import React from 'react';
import { CONTACT_US, BRAND_YEAR } from '../../../utils/constants';
import teleLogoUrl from '../../../static/images/baselogos/telelogo.svg'
import silantLogoUrl from '../../../static/images/baselogos/silant_text.svg'

const Footer = () => {
    return (
        <>
            <div className='footer_brand'>
                <img src={silantLogoUrl} alt="" className='footer_silant_text_logo'/>
                <p>{BRAND_YEAR}</p>
            </div> 
            <div className='footer_contacts'>
                <p>{CONTACT_US}</p>
                <img src={teleLogoUrl} alt="" />
            </div>
        </>
    );
}

export default Footer;

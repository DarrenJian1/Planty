import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/Untitled_Artwork 6.png';

function Header() {
    return (
        <header style={headerStyle}>
            {/* <h1 style={titleStyle}>My Plants</h1> */}
            {/* <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link> */}
            <div style={logoDiv}>
                <Link to="/" style={linkStyle}>
                    <img src={logo} style={logoStyle} alt="logo"></img>
                </Link>
            </div>
            
        </header>
    )
}

const headerStyle = {
    background: '#fff',
    //background: '#cef9e0',
    color: '#000',
    textAlign: 'left',
    padding: '1px',
    margin: '0px',
    position: 'sticky',
    height: '54px',
    borderBottom: 'solid 1px #ededed',
}
const titleStyle = {
    fontSize: '20px',
    color: '#cef9e0'
}

const linkStyle = {
    color: '#000',
    textDecoration: 'none',
    width: '50px',
}

const logoDiv = {
    paddingTop: '5px',
    justifyContent: 'center',
    width: '135px',
    margin: '0 auto',
}

const logoStyle = {
    height: '60px',
    //backgrounnd: '#cef9e0',
    display: 'block',
    margin: '0 auto',
}

export default Header;
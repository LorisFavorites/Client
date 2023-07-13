import React from "react";
import gitHub from "../assets/github.svg";
import logo from "../assets/pokefindr-logo.svg"

const Footer = () => {
    return (
        <footer>
            <div className="foot-container"><img className="logo" src={logo}></img></div>
            <div className="foot-container"><img className="github" src={gitHub}></img></div>
            <div className="foot-container">
                <ul>
                    <a href="https://github.com/codingprincess111"><li>codingprincess111</li></a>
                    <a href="https://github.com/ConDuckt"><li>ConDuckt</li></a>
                    <a href="https://github.com/mjlynch123"><li>mjlynch123</li></a>
                    <a href="https://github.com/reidmadock"><li>reidmadock</li></a>
                    <a href="https://github.com/ToastyStudent"><li>ToastyStudent</li></a>
                </ul>
            </div>    
        </footer>
    );
};

export default Footer;
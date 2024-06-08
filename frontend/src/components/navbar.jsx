import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = ({ routes }) => {
    console.log(routes);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="container-fluid">
                <a
                    className="navbar-brand"
                    href="#"
                >
                    PREP Software
                </a>
                <button
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-bs-target="#navbarScroll"
                    data-bs-toggle="collapse"
                    type="button"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarScroll"
                >
                    <ul
                        className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                        style={{
                            '--bs-scroll-height': '100px'
                        }}
                    >
                        <li className="nav-item">
                            <Link to="/voting" className="nav-link" aria-current="page">
                                Votar
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Results" className="nav-link">
                                Resultados
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
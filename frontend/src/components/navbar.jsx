import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a
                    className="navbar-brand"
                    href="#"
                >
                    Navbar scroll
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
                            <a
                                aria-current="page"
                                className="nav-link active"
                                href="#"
                            >
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                            >
                                Link
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                aria-expanded="false"
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                                href="#"
                                role="button"
                            >
                                Link
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                    >
                                        Action
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                    >
                                        Another action
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                    >
                                        Something else here
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a
                                aria-disabled="true"
                                className="nav-link disabled"
                            >
                                Link
                            </a>
                        </li>
                    </ul>
                    <form
                        className="d-flex"
                        role="search"
                    >
                        <input
                            aria-label="Search"
                            className="form-control me-2"
                            placeholder="Search"
                            type="search"
                        />
                        <button
                            className="btn btn-outline-success"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
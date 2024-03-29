import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';

import styles from '../navigation/navigation.module.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';

const Navigation = () => {
    const {
        isAuthenticated,
        user,
        logoutHandler,
    } = useContext(AuthContext);

    return (
        <Navbar expand="lg" className={styles['nav-bar']}>
            <Container className={styles['navigation-bar-container']}>
                <Navbar.Brand as={Link} to="/"><img className={styles['logo']} src='/Nexus Tunes-logos_transparent.png' alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav>
                            <Nav.Link as={Link} to="/browse">Browse</Nav.Link>
                        </Nav>
                    </Nav>
                    <Nav>
                        {isAuthenticated && (
                            <div className={styles['profile-info-container']}>
                                <img className={styles['profile-image']} src={user.image || '/user-image-default.webp'} alt="profile-image" />
                                <NavDropdown title={user.username} id="nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/user-profile">My Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/create-podcast">Add Podcast</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/create-episode">Add Episode</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} onClick={logoutHandler} to="/">Logout</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        )}

                        {!isAuthenticated && (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
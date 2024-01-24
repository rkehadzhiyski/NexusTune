import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';

import styles from '../navigation/navigation.module.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
    const {
        isAuthenticated,
        user,
        logoutHandler,
    } = useContext(AuthContext)
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/upload">Upload</Nav.Link>
                    </Nav>
                    <Nav>
                        {isAuthenticated && (
                            <div className={styles['profile-info-container']}> 
                            <img className={styles['profile-image']} src="/profile-image.jpg" alt="profile-image" />
                                <span>{user.username}</span>
                                <Nav.Link as={Link} onClick={logoutHandler} to="/">Logout</Nav.Link>
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
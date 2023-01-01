import { Navbar, Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';

import styles from './Layout.module.css';
import { logout } from 'libs/auth';

export default function Layout({ children }) {
    const { addToast } = useToasts();
    const onLogOut = () => {
        logout();
        addToast(`로그아웃 성공`, { appearance: 'success' });
    };

    return (
        <>
            <Navbar
                bg="dark"
                className={`navbar-dark sticky-top flex-md-nowrap p-0 justify-content-between ${styles.header}`}
                as="header"
            >
                <Navbar.Brand href="/" className="px-3">
                    RFQ ADMIN
                </Navbar.Brand>
                <Button className="m-3" variant="outline-light" size="sm" onClick={onLogOut}>
                    Log Out
                </Button>
            </Navbar>
            <Container fluid>
                <Row>
                    <Col md={3} lg={2} className={`p-2 bg-light ${styles.sidebar}`}>
                        <Nav activeKey="/" className="flex-row flex-md-column d-md-block">
                            <Nav.Item>
                                <Nav.Link href="/">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/Members">Request</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col md={9} lg={10} sm="auto" className="p-4" as="main">
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

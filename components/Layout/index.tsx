import { Navbar, Container, Row, Col, Nav, Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";

import styles from "./Layout.module.css";
import { useContext } from "react";
import { AuthContext } from "models/authContext";
import Router from "next/router";

export default function Layout({ children }) {
    const { addToast } = useToasts();

    const userInfo = useContext(AuthContext);
    const onLogin = () => {
        const currentPath =
            window.location.pathname + "/" + window.location.search;
        Router.push({
            pathname: "/login",
            query: { redirect_url: currentPath },
        });
    };

    return (
        <>
            <Navbar
                bg="dark"
                className={`navbar-dark sticky-top flex-md-nowrap p-0 justify-content-between ${styles.header}`}
                as="header"
            >
                <Navbar.Brand href="/" className="px-3">
                    Hyunseok Project
                </Navbar.Brand>
                <Button
                    className="m-3"
                    variant="outline-light"
                    size="sm"
                    onClick={onLogin}
                >
                    로그인
                </Button>
                <Button
                    className="m-3"
                    variant="outline-light"
                    size="sm"
                    onClick={onLogin}
                >
                    회원가입
                </Button>
            </Navbar>
            <Container fluid>
                <Row>
                    <Col
                        md={3}
                        lg={2}
                        className={`p-2 bg-light ${styles.sidebar}`}
                    >
                        <Nav
                            activeKey="/"
                            className="flex-row flex-md-column d-md-block"
                        >
                            <Nav.Item>
                                <Nav.Link href="/">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/Members">Memeber</Nav.Link>
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

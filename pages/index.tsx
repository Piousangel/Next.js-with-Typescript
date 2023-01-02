import React from "react";
import Layout from "../components/Layout";
import { Container } from "react-bootstrap";
import AuthProvider from "models/authProvider";
import { withAuthSync } from "libs/auth";

const Home = () => {
    return (
        <Layout>
            <AuthProvider>
                <Container fluid className="px-0 d-grid gap-5 mb-5"></Container>
            </AuthProvider>
        </Layout>
    );
};

export default Home;

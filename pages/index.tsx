import React from "react";
import Layout from "../components/Layout";
import { Container } from "react-bootstrap";
import { withAuthSync } from "libs/auth";

const Home = () => {
    return (
        <Layout>
            <Container fluid className="px-0 d-grid gap-5 mb-5"></Container>
        </Layout>
    );
};

export default withAuthSync(Home);

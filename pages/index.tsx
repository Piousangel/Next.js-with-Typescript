import React from "react";
import Layout from "../components/Layout";
import { withAuthSync } from "libs/auth";
import SendRequestForm from "../components/SendRequestForm";
import { Container } from "react-bootstrap";

const Home = () => {
    return (
        <Layout>
            <Container fluid className="px-0 d-grid gap-5 mb-5">
                <SendRequestForm />
            </Container>
        </Layout>
    );
};

export default withAuthSync(Home);

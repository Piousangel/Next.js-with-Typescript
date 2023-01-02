import { Alert } from "react-bootstrap";
import Layout from "../Layout";

type Props = {
    message: string;
};
const ErrorPage: React.FC<Props> = ({ message }) => (
    <Layout>
        <div className="text-center p-4">
            <Alert variant={"danger"}>{message}</Alert>
        </div>
    </Layout>
);

export default ErrorPage;

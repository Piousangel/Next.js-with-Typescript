import React from "react";
import {
    Col,
    Container,
    Pagination as BootstrapPagination,
    Row,
} from "react-bootstrap";

interface PageProps {
    limit?: number;
    page?: number;
    total?: any;
    onChangePage?: any;
    disabled?: boolean;
}

const Pagination: React.FunctionComponent<PageProps> = ({
    limit,
    page = 1,
    total = 0,
    onChangePage,
    disabled = false,
}) => {
    const first = (page - 1) * limit + 1;
    const last = page * limit < total ? page * limit : total;
    const firstpage = 1;
    const lastpage = Math.ceil(total / limit);

    return (
        <Container fluid>
            <Row className="align-items-baseline">
                <Col md={{ offset: 4 }}>
                    <BootstrapPagination className="justify-content-center">
                        <BootstrapPagination.First
                            onClick={() => onChangePage(firstpage)}
                            disabled={disabled || Number(page) == firstpage}
                        />
                        <BootstrapPagination.Prev
                            onClick={() => onChangePage(page - 1)}
                            disabled={disabled || Number(page) == firstpage}
                        />
                        <BootstrapPagination.Item active>
                            {page}
                        </BootstrapPagination.Item>
                        <BootstrapPagination.Next
                            onClick={() => onChangePage(page + 1)}
                            disabled={disabled || Number(page) == lastpage}
                        />
                        <BootstrapPagination.Last
                            onClick={() => onChangePage(lastpage)}
                            disabled={disabled || Number(page) == lastpage}
                        />
                    </BootstrapPagination>
                </Col>
                <Col className="d-md-block d-none">
                    <div className="text-muted text-end">
                        <b>
                            {first}-{last}
                        </b>{" "}
                        item of <b>{total}</b>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Pagination;

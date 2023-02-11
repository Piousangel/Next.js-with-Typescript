import React, { useEffect } from "react";
// import useSWR from "swr";
import { useState } from "react";
import { withAuthSync } from "libs/auth";

import qs from "qs";
import {
    Table,
    Breadcrumb,
    Spinner,
    Container,
    Row,
    Form,
    Col,
    Button,
} from "react-bootstrap";

import Link from "next/link";
import Layout from "components/Layout";
import Pagination from "components/Pagination";
import useDebounce from "hook/useDebounce";

const NoticeBoard = () => {
    const limit = 20;
    const [page, setPage] = useState(1);
    const [comment, setComment] = useState("");
    const [lowScore, setLowScore] = useState(undefined);
    const [serviceIds, setServiceIds] = useState<number[]>([]);

    const [tempComment, setTempComment] = useState("");
    const deboucedComment = useDebounce(tempComment);

    useEffect(() => {
        setComment(deboucedComment);
        setPage(1);
    }, [deboucedComment]);

    const onChangeComment = (val) => {
        setTempComment(val);
    };

    const onChangeScore = (checked) => {
        if (checked) {
            setLowScore(3);
            setPage(1);
        } else {
            setLowScore(undefined);
            setPage(1);
        }
    };

    const onChangeServiceIds = (newServiceIds: number[]) => {
        setServiceIds(newServiceIds);
        setPage(1);
    };

    // const { data: reviewsData, error: reviewsError } = useSWR<ReviewPagination>(
    //     `/reviews?${qs.stringify(
    //         {
    //             page: Number(page) - 1,
    //             limit,
    //             comment,
    //             low_score: lowScore,
    //             service_ids: serviceIds,
    //         },
    //         { arrayFormat: "repeat" }
    //     )}`,
    //     fetcher
    // );

    // const { data: servicesData = [], error: servicesError } = useSWR(
    //     `/filters/service`,
    //     fetcher
    // );

    return (
        <Layout>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/noticeBoard" active>
                    Review
                </Breadcrumb.Item>
            </Breadcrumb>
            <Container
                fluid
                className="mx-0 mb-3 py-3 border rounded d-grid gap-2"
            >
                <Form.Group as={Row} controlId="comment">
                    <Form.Label column sm={2}>
                        검색 하기
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            value={tempComment}
                            onChange={(e) => onChangeComment(e.target.value)}
                            placeholder="게시글 검색"
                            aria-label="게시글 검색"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="score">
                    <Form.Label column sm={2}></Form.Label>
                    <Col sm={10}>
                        <Form.Check
                            value={comment}
                            onChange={(e) => onChangeScore(e.target.checked)}
                            label="2점 이하 게시물만 검색"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="Products">
                    <Form.Label column sm={2}>
                        게시물 작성
                    </Form.Label>
                    <Button>작성하기</Button>
                </Form.Group>
            </Container>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>작성자</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </Table>

            <Pagination
                page={page}
                total={20}
                limit={limit}
                onChangePage={(p) => setPage(p)}
            />
        </Layout>
    );
};

export default NoticeBoard;

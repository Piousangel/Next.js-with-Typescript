import React, { useEffect } from "react";
import { useState } from "react";

import {
    Table,
    Breadcrumb,
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
    const [showModal, setShowModal] = useState(false);
    const [tempComment, setTempComment] = useState("");
    const deboucedComment = useDebounce(tempComment);

    useEffect(() => {
        setComment(deboucedComment);
        setPage(1);
    }, [deboucedComment]);

    const onChangeComment = (val) => {
        setTempComment(val);
    };

    const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowModal(!showModal);
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

    return (
        <Layout>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/noticeBoard" active>
                    게시판
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
                    <Button onClick={onClick}>작성하기</Button>
                </Form.Group>
            </Container>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>게시물 번호</th>
                        <th>작성자</th>
                        <th>평점</th>
                        <th>제목</th>
                        <th>작성일</th>
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

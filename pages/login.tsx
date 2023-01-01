import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import fetcher from 'libs/fetcher';
import { login } from 'libs/auth';
import Router, { useRouter } from 'next/router';
import qs from 'qs';

export default function LoginPage() {
    const { addToast } = useToasts();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const makeQueryString = (queryString: string | string[] | undefined): string => {
        if (typeof queryString === 'undefined') {
            queryString = '/';
        } else if (typeof queryString !== 'string') {
            queryString = qs.stringify(queryString, { arrayFormat: 'repeat' });
        }
        return queryString;
    };

    const redirectUrl = makeQueryString(router.query.redirect_url);

    const onClick = async () => {
        const { message, user, access_token } = await fetcher(`/login`, 'POST', {
            username,
            password,
        });
        if (message) {
            Router.replace({
                pathname: '/login',
                query: { redirect_url: redirectUrl },
            });
            addToast(`로그인 실패 - ${message}`, { appearance: 'error' });
        } else {
            login({ token: access_token, user });
            Router.replace(redirectUrl);
            addToast(`로그인 성공`, { appearance: 'success' });
        }
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onClick();
        }
    };

    const items = ['🍔', '🧀', '🍟', '🍕', '🍩', '🍿', '🍤'];
    const item = items[Math.floor(Math.random() * items.length)];

    return (
        <Container className="my-4 d-grid gap-3">
            <Row className="mb-4">
                <Col>
                    <h3>{item} RFQ ADMIN</h3>
                </Col>
            </Row>
            <Row>
                <Form.Group>
                    <Form.Label>아이디</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="아이디를 입력하세요."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={(e) => onKeyPress(e)}
                    />
                    <Form.Text className="text-muted">Backoffice 아이디로 로그인하세요.</Form.Text>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group>
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="비밀번호를 입력하세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => onKeyPress(e)}
                    />
                </Form.Group>
            </Row>
            <Row className="mx-0">
                <Button variant="primary" onClick={onClick}>
                    로그인
                </Button>
            </Row>
        </Container>
    );
}

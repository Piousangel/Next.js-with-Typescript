import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useContext, useState } from "react";
import Router, { useRouter } from "next/router";
import qs from "qs";
import { useToasts } from "react-toast-notifications";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
} from "firebase/auth";
import { AuthContext } from "models/authContext";
import { auth } from "models/firebase";

const provider = new GoogleAuthProvider();

export default function LoginPage() {
    const { addToast } = useToasts();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const userInfo = useContext(AuthContext);
    const [isCreate, setIsCreate] = useState(false);

    const router = useRouter();

    const makeQueryString = (
        queryString: string | string[] | undefined
    ): string => {
        if (typeof queryString === "undefined") {
            queryString = "/";
        } else if (typeof queryString !== "string") {
            queryString = qs.stringify(queryString, { arrayFormat: "repeat" });
        }
        return queryString;
    };

    const redirectUrl = makeQueryString(router.query.redirect_url);

    const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsCreate((pre) => !pre);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 회원 가입일때
        if (isCreate) {
            createUserWithEmailAndPassword(auth, username, password)
                .then(() => {
                    alert("회원가입 성공");
                })
                .catch((e) => {
                    alert(e);
                });
        }
    };

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            onClick(e);
        }
    };

    return (
        <Container className="my-4 d-grid gap-3">
            <Row className="mb-4">
                <Col>
                    <h3> Hyunseok Project</h3>
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
                    <Form.Text className="text-muted">
                        아이디로 로그인하세요.
                    </Form.Text>
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
                <Form onSubmit={handleSubmit}>
                    <Button variant="primary">
                        {isCreate ? "이 아이디로 가입하기" : "로그인 하기"}
                    </Button>
                    <Button variant="primary" onClick={onClick}>
                        {isCreate ? "가입 취소하기" : "회원가입 하러가기"}
                    </Button>
                </Form>
            </Row>
        </Container>
    );
}

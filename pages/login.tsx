import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useContext, useState } from "react";
import Router, { useRouter } from "next/router";
import qs from "qs";
import { useToasts } from "react-toast-notifications";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { AuthContext } from "models/authContext";
import { auth } from "models/firebase";
import { login } from "libs/auth";
import SignupModal from "components/\bSignupModal";
import { SignupType } from "structures";

export default function LoginPage() {
    const { addToast } = useToasts();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showSignupMoal, setShowSignupModal] = useState(false);
    const userInfo = useContext(AuthContext);

    const signUpItem: SignupType = {
        email: "",
        password: "",
    };

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
        setShowSignupModal(!showSignupMoal);
    };

    const onSave = async (info: SignupType) => {
        // 회원 가입일때
        createUserWithEmailAndPassword(auth, info.email, info.password)
            .then(() => {
                addToast(`${userInfo}님 회원가입을 환영합니다.`, {
                    appearance: "success",
                });
                setShowSignupModal(!showSignupMoal);
            })
            .catch((e) => {
                Router.replace({
                    pathname: "/login",
                    query: { redirect_url: redirectUrl },
                });
                addToast(`${e} 회원가입에 실패하였습니다...`, {
                    appearance: "error",
                });
            });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, username, password)
            // .then(() => {
            //     login({ token: userInfo.getIdToken, user: username });
            // })
            .then(() => {
                Router.replace(redirectUrl);
                addToast(`${userInfo}님 로그인을 환영합니다.`, {
                    appearance: "success",
                });
            })
            .catch((e) => {
                Router.replace({
                    pathname: "/login",
                    query: { redirect_url: redirectUrl },
                });
                addToast(`${e} 로그인에 실패하였습니다...`, {
                    appearance: "error",
                });
            });
    };

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            onClick(e);
        }
    };

    return (
        <Container className="my-4 d-grid gap-3">
            {userInfo ? <div> 로그인 상태입니다 </div> : null}
            <Row className="mb-4">
                <Col>
                    <h3> 로그인 페이지 </h3>
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
            <Button variant="primary" onClick={handleSubmit}>
                로그인 하기
            </Button>
            <Button variant="secondary" onClick={onClick}>
                회원가입 하러가기
            </Button>
            <SignupModal
                showModal={showSignupMoal}
                title={"회원가입 폼"}
                item={signUpItem}
                onClose={() => setShowSignupModal(false)}
                onSave={onSave}
            />
        </Container>
    );
}

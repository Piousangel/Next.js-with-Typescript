import React, { SetStateAction, useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";

type SignupModalProps = {
    showModal: boolean;
    title?: string;
    updateDisabled?: boolean;
    onClose: () => void;
    onSave: () => void;
};

const SignupModal = (props: SignupModalProps) => {
    const {
        showModal,
        updateDisabled = false,
        title = "회원 가입 폼",
        onClose,
        onSave,
    } = props;

    const { addToast } = useToasts();
    const [nickname, setNickname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            onSave();
        }
    };

    return (
        <Modal show={showModal}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="d-grid gap-4">
                    <Form.Group>
                        <Form.Label>닉네임</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="닉네임을 입력하세요."
                            value={nickname}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={(e) => onKeyPress(e)}
                        />
                    </Form.Group>
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
                    <Form.Group>
                        <Form.Label>휴대폰 번호</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="휴대폰 번호를 입력하세요."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={(e) => onKeyPress(e)}
                        />
                    </Form.Group>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={onSave}
                    disabled={updateDisabled}
                >
                    회원 가입
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    취소
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SignupModal;

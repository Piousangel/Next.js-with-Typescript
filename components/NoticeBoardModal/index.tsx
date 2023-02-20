import React, { SetStateAction, useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { ContentType, SignupType } from "structures";

type SignupModalProps = {
    showModal: boolean;
    id: string;
    title?: string;
    item: ContentType;
    onClose: () => void;
    onSave: (item: ContentType) => void;
};

const SignupModal = (props: SignupModalProps) => {
    const { showModal, item, titel, onClose, onSave } = props;

    const { addToast } = useToasts();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSaveInfo = () => {
        onSave({
            ...item,
            title: title,
            content: content,
        });
    };

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            onSave({
                ...item,
                title: title,
                content: content,
            });
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
                        <Form.Label>제목</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="제목을 입력하세요."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyPress={(e) => onKeyPress(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>내용</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="내용을 입력하세요."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyPress={(e) => onKeyPress(e)}
                        />
                    </Form.Group>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSaveInfo}>
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

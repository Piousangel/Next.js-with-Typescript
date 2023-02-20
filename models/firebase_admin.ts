import * as admin from "firebase-admin";

interface Config {
    credential: {
        privateKey: string;
        clientEmail: string;
        projectId: string;
    };
}

export default class FirebaseAdmin {
    public static instance: FirebaseAdmin;

    private init = false;

    // class 로 그대로 받아옴 존재하지 않으면 클래스 생성 및 초기화;
    public static getInstance(): FirebaseAdmin {
        if (
            FirebaseAdmin.instance === undefined ||
            FirebaseAdmin.instance === null
        ) {
            FirebaseAdmin.instance = new FirebaseAdmin();
            // 환경 초기화 진행
            FirebaseAdmin.instance.bootstrap();
        }
        return FirebaseAdmin.instance;
    }

    /** firestore  필드처럼 실행할 것임*/
    public get Firebase(): FirebaseFirestore.Firestore {
        if (this.init === false) {
            this.bootstrap();
        }
        return admin.firestore();
    }

    public get Auth(): admin.auth.Auth {
        if (this.init === false) {
            this.bootstrap();
        }
        return admin.auth();
    }

    private bootstrap(): void {
        const haveApp = admin.apps.length !== 0;
        if (haveApp) {
            this.init = true;
            return;
        }

        const config: Config = {
            credential: {
                projectId: process.env.projectId || "",
                clientEmail: process.env.clientEmail || "",
                privateKey: (process.env.privateKey || "").replace(
                    /\\n/g,
                    "\n"
                ), //한줄로 만든것 다시 개행문자 넣기
            },
        };

        // 초기화 진행
        admin.initializeApp({
            credential: admin.credential.cert(config.credential),
        });
        console.info("bootstrap firebase admin");
    }
}

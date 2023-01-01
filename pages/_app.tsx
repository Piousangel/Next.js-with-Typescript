import "../styles/globals.css";
import type { AppProps /*, AppContext */ } from "next/app";
import { ToastProvider } from "react-toast-notifications";

const MyApp = function ({ Component, pageProps }: AppProps) {
    return (
        <ToastProvider
            autoDismiss
            autoDismissTimeout={3000}
            placement="bottom-left"
        >
            <Component {...pageProps} />
        </ToastProvider>
    );
};

export default MyApp;

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastProvider } from "react-toast-notifications";
import AuthProvider from "models/authProvider";

function App({ Component, pageProps }) {
    return (
        <ToastProvider
            autoDismiss
            autoDismissTimeout={3000}
            placement="bottom-left"
        >
            <Component {...pageProps} />
        </ToastProvider>
    );
}

export default App;

// Adapted from https://latteandcode.medium.com/react-toast-an-implementation-with-the-context-api-and-hooks-f52fa564e4a8
import { useCallback, useContext, useState, createContext } from "react";
import Toast from "../components/Toast";
import ToastsContainer from "../components/ToastsContainer";

const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    function removeToast(timestamp) {
        setToasts(toasts.filter(toast => toast.timestamp !== timestamp));
    }


    const addToast = useCallback(
        function (toast, duration) {
            // Set toast timestamp as id
            const currentDate = new Date();
            const timestamp = currentDate.getTime();

            // Add toast
            setToasts((toasts) => [...toasts, {...toast, timestamp}]);
            setTimeout(() => setToasts((toasts) => toasts.slice(1)), duration ? duration : 3000);
        },
        [setToasts]
    );

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <ToastsContainer>
                {toasts.map((toast) => (
                    <Toast text={toast.text} type={toast.type} handleRemove={() => removeToast(toast.timestamp)} />
                ))}
            </ToastsContainer>
        </ToastContext.Provider>
    );
}

export function useToastContext() {
    return useContext(ToastContext);
}
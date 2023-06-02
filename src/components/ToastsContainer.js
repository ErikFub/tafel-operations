import '../index.css'

export default function ToastsContainer({ children }) {
    return (
        <div id='toasts-container' className="fixed bottom-5 right-5 overlay">
            {children}
        </div>
)
}
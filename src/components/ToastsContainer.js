import '../index.css'

export default function ToastsContainer({ children }) {
    return (
        <div className="fixed bottom-5 right-5 overlay">
            {children}
        </div>
)
}
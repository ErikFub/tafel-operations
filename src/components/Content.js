export default function Content({ children }) {
    return (
        <main>
            <div className="p-10 sm:ml-64">
                {children}
            </div>
        </main>
    )
}
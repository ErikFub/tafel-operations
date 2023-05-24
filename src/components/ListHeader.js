export default function ListHeader({ title }) {
    return (
        <h1 className="text-base font-bold text-gray-700 tracking-wide mb-3 ml-2">
            {title.toUpperCase()}
        </h1>
    )
}
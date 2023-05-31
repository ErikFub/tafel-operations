export default function ItemTag({ text, color }) {
    const defaultColor = 'gray'
    const colorAdj = color === undefined ? defaultColor : color
    return (
        <div className={`bg-${colorAdj}-100 inline-block px-2 py-1 text-sm text-${colorAdj}-700 font-semibold rounded-md`}>
            {text}
        </div>
    )
}
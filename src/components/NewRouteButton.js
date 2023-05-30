export default function NewRouteButton({ setShowNewModal }) {
    function handleClick() {
        setShowNewModal(true)
    }
    return (
        <div onClick={handleClick} className="w-full hover:cursor-pointer rounded-lg bg-white shadow px-5 py-1 mb-5">
            <div></div>
            <div>New Route</div>
        </div>
    )
}
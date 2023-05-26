import { useState } from "react";
import ThreeDotMenuButton from "./ThreeDotMenuButton";
import ThreeDotMenuDropdown from "./ThreeDotMenuDropdown";

export default function ThreeDotMenu({ children }) {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            <ThreeDotMenuButton handleClick={() => setShowMenu(!showMenu)}/>

            {showMenu && 
                <ThreeDotMenuDropdown>
                    {children}
                </ThreeDotMenuDropdown>
            }
        </>
    )
}
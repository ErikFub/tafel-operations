import { useState } from "react";
import ThreeDotMenuButton from "./ThreeDotMenuButton";
import MenuDropdown from "./MenuDropdown";
import '../index.css';

export default function ThreeDotMenu({ children }) {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div>
            <ThreeDotMenuButton handleClick={() => setShowMenu(!showMenu)}/>

            {showMenu && 
                <>
                    <div className='all-screen' onClick={() => setShowMenu(false)}></div>
                    <div className="absolute right-4">
                        <MenuDropdown>
                            {children}
                        </MenuDropdown>
                    </div>
                </>
            }
        </div>
    )
}
import ThreeDotMenuButton from "./ThreeDotMenuButton";
import MenuDropdown from "./MenuDropdown";
import '../index.css';
import { useItemMenuVisibilityContext } from "../contexts/ItemMenuVisibilityContext";
import { useEffect, useRef } from "react";

export default function ThreeDotMenu({ id, children }) {
    const { itemMenuVisibility, setItemMenuVisibility } = useItemMenuVisibilityContext();
    const itemMenuRef = useRef(null);

    // If this three dot menu should be shown, add event listener to all other elements to close menu on click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (itemMenuRef.current && !itemMenuRef.current.contains(event.target)) {
                setItemMenuVisibility(null);
              }
        };
    
        if (itemMenuVisibility === id) {
            document.addEventListener('click', handleClickOutside);
        
            return () => {
                document.removeEventListener('click', handleClickOutside);
            }
        }
      }, [id, itemMenuVisibility, setItemMenuVisibility]);


    return (
        <div ref={itemMenuRef} className="flex justify-center">
            <ThreeDotMenuButton handleClick={() => setItemMenuVisibility(id)}/>

            {itemMenuVisibility === id && 
                <>
                    <div className="relative">
                        <div className="absolute top-8 right-0">
                            <MenuDropdown>
                                {children}
                            </MenuDropdown>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
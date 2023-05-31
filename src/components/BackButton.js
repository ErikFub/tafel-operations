import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useNavigate } from "react-router-dom";

export default function BackButton({ text }) {
    const textAdj = text === undefined ? "Back" : text
    let navigate = useNavigate();
    return (
        <>
          <button onClick={() => navigate(-1)} className="bg-none text-gray-500 font-semibold h-6 mb-2">
            <FontAwesomeIcon icon={icon({name: 'angle-left'})} className='w-5 mr-1'/>
            {textAdj}
          </button> 
        </>
    );
}
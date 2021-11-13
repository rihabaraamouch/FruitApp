//this file is just for the display of fruits
import { useContext } from 'react';
import { FruitsContext } from '../contexts/FruitsContext';


export default function Fruitss({ Fruits }) {
    const {updateFruits,deleteFruit} =useContext(FruitsContext);
    
    const handleToggleStillaFav = ()=>{
        const updatedFiels ={
            ...Fruits.fields,
            //if we toggle the still a fav part it will change to the oppositev :)
            stillafav: !Fruits.fields.stillafav
        }
        const updatedFruits = {id: Fruits.id, fields: updatedFiels};
        updateFruits(updatedFruits);
    }
    return (
        <li className="bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-4">
            <input
                type="checkbox"
                name="stillafav"
                id="stillafav"
                checked={Fruits.fields.stillafav}
                className="mr-2 form-checkbox h-5 w-5"
                onChange={(handleToggleStillaFav)}
            />
            <p
                className={`flex-1 text-gray-800 ${
                    Fruits.fields.stillafav ? 'line-through' : ''
                }`}
            >
                {Fruits.fields.name}
            </p>
            <button
                type="button"
                className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded "
                onClick={()=>deleteFruit(Fruits.id)}
            >
                Delete
            </button>
        </li>
    );
}

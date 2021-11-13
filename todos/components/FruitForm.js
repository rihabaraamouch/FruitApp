import React, { useState,useContext } from 'react';
import { FruitsContext } from '../contexts/FruitsContext';

export default function FruitForm() {
    const [Fruit, setFruit] = useState('');
    const {addFruits} = useContext(FruitsContext);

    const handleSubmit = (e)=>{
        e.preventDefault();
        addFruits(Fruit);
        setFruit(Fruit);
    };

    return (
        <form className="form my-6" onSubmit={handleSubmit}>
            <div className="flex flex-col text-sm mb-2">
                <label className="font-bold mb-2 text-gray-800" htmlFor="todo">
                    Enter a Fruit
                </label>
                <input
                    type="text"
                    name="fruit"
                    id="fruit"
                    value={Fruit}
                    onChange={(e) => setFruit(e.target.value)}
                    placeholder="submitt your new Favorite Fruit"
                    className="border border-gray-200 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
                />
            </div>
            <button
                type="submit"
                className="w-full rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
            >
                Submit
            </button>
        </form>
    );
}

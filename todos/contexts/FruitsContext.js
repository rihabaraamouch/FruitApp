import { createContext, useState } from 'react';

const FruitsContext = createContext();

const FruitsProvider = ({ children }) => {
    const [Fruits, setFruits] = useState([]);

    const refreshFruits = async () => {
        try {
            const res = await fetch('/api/getFruits');
            const latestFruit = await res.json();
            setFruits(latestFruit);
        } catch (err) {
            console.error(err);
        }
    };

    const addFruits = async (name) => {
        try {
            const res = await fetch('/api/createFruits', {
                method: 'POST',
                body: JSON.stringify({ name }),
                headers: { 'Content-Type': 'application/json' },
            });
            const newFruit = await res.json();
            setFruits((prev) => {
                return [newFruit, ...prev];
            });
        } catch (err) {
            console.error(err);
        }
    };

    const updateFruits= async (updatedFruit) => {
        try {
            const res = await fetch('/api/updateFruits', {
                method: 'PUT',
                body: JSON.stringify(updatedFruit),
                headers: { 'Content-Type': 'application/json' },
            });
            await res.json();
            setFruits((prev) => {
                const existingFruits = [...prev];
                const existingFruit = existingFruits.find(
                    (fruit) => fruit.id === updatedFruit.id
                );
                existingFruit.fields = updatedFruit.fields;
                return existingFruits;
            });
        } catch (err) {
            console.error(err);
        }
    };

    const deleteFruit = async (id) => {
        try {
            await fetch('/api/deleteFruits', {
                method: 'Delete',
                body: JSON.stringify({ id }),
                headers: { 'Content-Type': 'application/json' },
            });

            setFruits((prev) => {
                return prev.filter((fruit) => fruit.id !== id);
            });
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <FruitsContext.Provider
            value={{

                Fruits,
                setFruits,
                refreshFruits,
                updateFruits,
                deleteFruit,
                addFruits,
            }}
        >
            {children}
        </FruitsContext.Provider>
    );
};

export { FruitsProvider, FruitsContext };

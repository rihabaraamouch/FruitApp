import Head from 'next/head';
import { table, minifyRecords } from './api/utils/airtable';
import Navbar from '../components/Navbar';
import Fruitss from '../components/Fruits';
import { FruitsContext } from '../contexts/FruitsContext';
import { useEffect, useContext } from "react";
import auth0 from './api/utils/auth0';
import FruitForm  from '../components/FruitForm';

export default function Home({ initialFruits, user }) {
    const { Fruits, setFruits } = useContext(FruitsContext);
    console.log(user);
    useEffect(() => {
        setFruits(initialFruits);
    }, []);

    console.log(initialFruits);
    ///
    return (
        <div className="max-w-xl m-auto p-2">
            <Head>
                <title>My Fruits CRUD App</title>
            </Head>
            <main>
            <Navbar user={user} />

                {user ? (
                    <>

                        <FruitForm />
                        <ul>

                            {Fruits && Fruits.map(Fruits => (
                                <Fruitss Fruits={Fruits} key={Fruits.id} />
                            ))}
                        </ul>
                    </>
                ): (
                    <p className="text-center mt-4">
                        Please login to save todos!
                    </p>
                
                )}

            </main>
        </div>
    );
}
//naitevely supported by next.js 

export async function getServerSideProps(context) {
    const session = await auth0.getSession(context.req);
    let Fruits = [];
    if (session?.user) {
        Fruits = await table
            .select({ filterByFormula: `userId = '${session.user.sub}'` })
            .firstPage();
    }
    return {
        props: {
            initialFruits: minifyRecords(Fruits),
            user: session?.user || null,
        },
    };
}





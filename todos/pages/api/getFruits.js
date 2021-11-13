//api import that iwll get all our fruit 
import { table, minifyRecords } from './utils/Airtable';
import auth0 from './utils/auth0';

const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
);


export default auth0.requireAuthentication( async (req, res) => {
    try {
        const records = await table.select({}).firstPage();
        const minifiedRecords = minifyRecords(records);
        res.statusCode = 200;
        res.json(minifiedRecords);
    } catch (err) {
        res.statusCode = 500;
        res.json({ msg: 'Something went wrong' });
    }
});
import auth0 from "../utils/auth0";
import {table} from "../utils/Airtable";

const ownsRecord = (handler) => auth0.requireAuthentication(async (req, res) => {
        const { user } = await auth0.getSession(req);
        //grab the id of the record from the body
        const {id} = req.body;

        try{
            const existingRecord = await table.find(id);
            if(! existingRecord|| user.sub !== existingRecord.fields.userId ){
                res.status = 404;
                return res.json({msg: 'Record was not found'});
            }
            req.record = existingRecord;
            return handler(req,res);
        }catch(error){
            console.error(err);
            res.statusCode = 500;
            return res.json({ msg: 'Something went wrong' });
        }
});

export default ownsRecord;
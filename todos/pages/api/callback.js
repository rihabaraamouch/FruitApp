import auth0 from './utils/auth0';
// updating the session, tracking the user and redirecting the usert back home  


export default async function callback(req, res) {
    try {
        await auth0.handleCallback(req, res, { redirectTo: '/' });
    } catch (error) {
        console.error(error);
        res.status(error.status || 400).end(error.message);
    }
}


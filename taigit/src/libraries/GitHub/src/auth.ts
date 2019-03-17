import axios from "axios"

/**
 * Takes in a client_id and creates a redirect URL to start the OAuth process
 * @param client_id  the CLIENT_ID of the GitHub Application
 * @return           a url to the authorization system
 */
export function
authRedirect(client_id : string) : string {
    if(client_id == null){
        throw new Error("keys.json file is missing proper values! " +
        "Please check with the development team to ensure the GitHub " +
        "keys are set.");
    }
    return "https://github.com/login/oauth/" +
    "authorize?scope=user:email&client_id=" + client_id;
}

/**
 * Takes in a client_id, client_secret, and session_code from GitHub and
 * returns the authorization token
 * @param client_id     the CLIENT_ID of the GitHub Application
 * @param client_secret the CLIENT_SECRET of the GitHub Application
 * @param session_code  a value returned from GitHub after initial authorization
 * @return              an auth token for a user
 */
export async function
getAuthToken(client_id : string, client_secret : string, session_code : string) : Promise<string> {
    if(client_id == null || client_secret == null) {
        throw new Error("keys.json file is missing proper values! " +
        "Please check with the development team to ensure the GitHub " +
        "keys are set.");
    }
    let oauth = await axios.post("https://github.com/login/oauth/access_token",
    {
        "client_id" : client_id,
        "client_secret" : client_secret,
        "code" : session_code
    },{
        headers: {'accept': 'application/json'}
    });
    return oauth.data.access_token;
}

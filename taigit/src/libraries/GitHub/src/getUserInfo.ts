import axios from "axios";
/**
 * The following function grabs user info when given the auth key
 */
export async function
getUserInfo(auth: string){
    try{
        var config = {
            headers: {'Authorization': "Bearer " + auth}
        }
        let userInfo = await axios.get("https://api.github.com/user", config);
        return userInfo.data;
    }
    catch (error) {
        console.log(error)
        return -1
    }
}
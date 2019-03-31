import axios from 'axios';

export async function
getUserRepos(owner: string, auth: string){
    try{
        var config = {
            headers: {'Authorization': "Bearer " + auth}
        }
        const userRepos = await axios.get("https://api.github.com/users/" + owner +
            "/repos", config);
        return userRepos.data;
    } catch (error) {
        console.log(error);
    }
    return -1;
}

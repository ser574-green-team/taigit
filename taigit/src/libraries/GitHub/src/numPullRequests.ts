import axios from 'axios';

export async function
getNumPullRequests(owner: string, repo: string, auth: string){
    try{
        var config = {
            headers: {'Authorization': "Bearer " + auth}
        }
        const pulls = await axios.get("https://api.github.com/repos/" + owner +
            "/" + repo + "/pulls", config);
        return pulls.data.length;
    } catch (error) {
        console.log(error);
    }
    return -1;
}

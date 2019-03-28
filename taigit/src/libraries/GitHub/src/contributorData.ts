import axios from 'axios';

export async function
contributorData(owner: string, repo: string, auth: string) {
    try {
        var config = {
            headers: {'Authorization': "Bearer " + auth}
        }
        const contributorData = await axios.get("https://api.github.com/repos/" + owner +
            "/" + repo + "/stats/contributors", config);
        return contributorData.data;
    } catch (error) {
        console.log(error);
    }
    return -1;
}

import axios from 'axios';

export async function 
contributorData(owner: string, repo: string) {
    try {
        const contributorData = await axios.get("https://api.github.com/repos/" + owner + 
            "/" + repo + "/stats/contributors");
        return contributorData.data;
    } catch (error) {
        console.log(error);
    }
    return -1;
}
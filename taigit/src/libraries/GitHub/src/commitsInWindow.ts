import axios from 'axios';

export async function 
getCommitsInTimeWindow(owner: string, repo: string, Since: string, Until: string)
    : Promise<any>{
    try{
        const pulls = await axios.get("https://api.github.com/repos/" + owner + 
            "/" + repo + "/commits", {
            params: {
                since: Since,
                until: Until
            }})
        return pulls.data;
    } catch (error) {
        console.log(error);
    }

    return -1;

}

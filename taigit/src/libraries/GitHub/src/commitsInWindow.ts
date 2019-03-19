import axios from 'axios';

/**
 * gets the commits in a time window as a list.
 * 
 * @param owner owner of the repo
 * @param repo the name of the repo
 * @param Since ISO 8601 format: YYY-MM-DDTHH:MM:SSZ, start date of commits
 * @param Until ISO 8601 format: YYY-MM-DDTHH:MM:SSZ, no commits after this
 */
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

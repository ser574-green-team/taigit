import axios from 'axios';

/**
 * Returns: -1 if error, list of comits if successful.
 * Commit structure: https://developer.github.com/v3/repos/commits/
 *
 * @param owner username of owner of repo
 * @param repo name of repo
 * @param Since ISO 8601 UTC format string (YYYY-MM-DDTHH:MM:SSZ), the earlier date in the time window
 * @param Until ISO 8601 UTC format string (YYYY-MM-DDTHH:MM:SSZ), the later date in the window.
 */
export async function
getCommitsInTimeWindow(owner: string, repo: string, Since: string,
    Until: string, auth: string): Promise<any>{
    try{
        var config = {
            headers: {'Authorization': "Bearer " + auth},
            params: {
                since: Since,
                until: Until
            }
        }
        const pulls = await axios.get("https://api.github.com/repos/" + owner +
            "/" + repo + "/commits", config)
        return pulls.data;
    } catch (error) {
        console.log(error);
    }

    return -1;

}

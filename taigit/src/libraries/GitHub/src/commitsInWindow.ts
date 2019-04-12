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

/**
 * Upon a successful call returns the total number of commits made to the repo within the past year.
 * @param owner 
 * @param repo 
 * @param auth 
 */
export async function
getTotalCommits(owner: string, repo: string, auth: string) : Promise<number>{
    let num : number = -1;
    try{
        var config = {
            headers: {'Authorization': "Bearer " + auth},
        }
        const commits = await axios.get('https://api.github.com/repos/'+owner+'/'+
                        repo+'/stats/commit_activity',config);

        for(var i of commits.data){
            num += i.total;
        }
        console.log('num:\n', num);
    }catch(error){
        console.log("Error TotalCommits:\n", error);
    }
    return num;
}


/**
 * Gets the number of commits by a specified author
 *
 * @param owner username of repo owner
 * @param repo name of repo
 * @param author author being investigated
 */
export async function
getNumCommitsFromUser(owner: string, repo: string, author: string,
    auth: string){
    try{
        var config = {
            headers: {'Authorization': "Bearer " + auth}
        }
        const userRepos = await axios.get("https://api.github.com/repos/" + owner +
            "/" + repo + "/commits" + "?author=" + author, config);
        return userRepos.data.length;


    } catch (error) {
        console.log(error);
    }

    return -1;

}

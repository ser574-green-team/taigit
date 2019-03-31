import axios from 'axios';

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

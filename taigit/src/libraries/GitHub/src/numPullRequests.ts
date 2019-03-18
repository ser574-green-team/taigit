import axios from 'axios';


/**
 * Returns the number of pull requests in a repo
 * 
 * @param owner owner of repo
 * @param repo name of repo
 */
export async function 
getNumPullRequests(owner: string, repo: string){
    try{
        const pulls = await axios.get("https://api.github.com/repos/" + owner + 
            "/" + repo + "/pulls");
        return pulls.data.length;
        
    
    } catch (error) {
        console.log(error);
    }

    return -1;

}

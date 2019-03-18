import axios from 'axios';

/**	
 * Returns an integer: the number of commits by the given author	
 * 	
 * @param owner owner of repo	
 * @param repo name of repo	
 * @param author author of commits	
 */
export async function 
getNumCommitsFromUser(owner: string, repo: string, author: string){
    try{
        const userRepos = await axios.get("https://api.github.com/repos/" + owner + 
            "/" + repo + "/commits" + "?author=" + author);
        return userRepos.data.length;
        
    
    } catch (error) {
        console.log(error);
    }

    return -1;

}

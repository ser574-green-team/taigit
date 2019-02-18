import axios from 'axios';

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

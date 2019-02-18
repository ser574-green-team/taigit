import axios from 'axios';

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

import axios from 'axios';

export async function
getNumComments(owner : string, repo: string,  number : number)
    :Promise<any>{
    try{
        const comments = await axios.get("https://api.github.com/repos/" + owner +
            "/" + repo + "/pulls/?state=all");
        console.log(comments);
        return comments.data.length;
    }
    catch (error) {
        console.log(error);

    }
    return -1;
}


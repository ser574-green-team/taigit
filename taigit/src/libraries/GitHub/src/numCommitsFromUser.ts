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
        let commits = 0
        var config = {
            headers: {'Authorization': "Bearer " + auth}
        }
        const userRepos = await axios.get("https://api.github.com/repos/" + owner +
            "/" + repo + "/commits" + "?author=" + author, config);
        if(userRepos.headers.hasOwnProperty("link")){
            let last = userRepos.headers["link"].split(',');
            let total_pages_str = last[1]
            let total_pages = total_pages_str.substring(total_pages_str.lastIndexOf("page") + 5, total_pages_str.lastIndexOf(">"))
            total_pages = Number(total_pages)
            for (var j = 1; j <= total_pages; j++) {
                const innerpulls = await axios.get("https://api.github.com/repos/" + owner +
                    "/" + repo + "/commits" + "?author=" + author+"&page=" + j, config);
                commits += innerpulls.data.length
            }
            return commits
        }
        else{
            return userRepos.data.length;
        }



    } catch (error) {
        console.log(error);
    }

    return -1;

}
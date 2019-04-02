/**
 * The following function returns an Array four values viz: 1. Pull Request Number 2. Timestamp of
 * PR Created at 3. Timestamp of PR Closed at 4. Timestamp of PR merged at.
 * The TimeStamp follows this format : YYYY-MM-DDTHH:MM:SSZ
 * Note : If value at index '2' i.e closed_at = Null, that means that the PR is not Closed yet.
 * @param owner       The name of the owner of the repository in String format.
 * @param repo        The name of the Github repository in String format.
 * @param auth        The auth key in string format
 * @param pullNumber  The pull request number whose history is required.
 * @return            An Array of four values.
 */
import axios from 'axios';

export async function
gethistoryPR(owner : string, repo: string, auth:string, pullNumber: number){
    try{
        let arrayOfHistory = Array()
        var config = {
            headers: {'Authorization': "Bearer " + auth}
        }
        let initialPull = await axios.get("https://api.github.com/repos/" + owner +
            "/" + repo + "/pulls?state=all&direction=asc", config);
        let last = initialPull.headers["link"].split(',');
        let total_pages_str = last[1]
        let total_pages = total_pages_str.substring(total_pages_str.lastIndexOf("page") + 5,total_pages_str.lastIndexOf(">"))
        total_pages = Number(total_pages)
        for(var j =1 ; j <= total_pages;j++){
            let pullReq = await axios.get("https://api.github.com/repos/" + owner +
                "/" + repo + "/pulls?state=all&direction=asc&page="+j, config);
            await pullReq.data.forEach(function (req :{number:string, created_at:string, closed_at:string,merged_at : string}) {
                if(Number(req.number) == pullNumber){
                    let created : string = req.created_at;
                    let closed : string = req.closed_at;
                    let merged : string = req.merged_at;
                    arrayOfHistory.push(req.number,created,closed,merged)
                    return arrayOfHistory
                }
            })
        }
        return arrayOfHistory
    }
    catch (error) {
        console.log(error);
        return -1;
    }
}


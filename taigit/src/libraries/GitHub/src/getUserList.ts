import axios from "axios";
/**
 * The following function returns the list of all contributer usernames in a
 * respository.
 * @param owner  The name of the owner of the repository in String format.
 * @param repo   The name of the Github repository in String format.
 * @return       The list consisting of usernames of All Contributers in the repo.
 */
export  async function
getContributerNames(owner : string, repo: string, auth: string){
    try{
        let contriNames: Array<string> = [];
        var config = {
            headers: {'Authorization': "Bearer " + auth}
        }
        let listOfContributers = await axios.get("https://api.github.com/repos/" + owner +
            "/" + repo + "/contributors", config);
        if(listOfContributers.headers.hasOwnProperty("link")){
            let last = listOfContributers.headers["link"].split(',');
            let total_pages_str = last[1]
            let total_pages = total_pages_str.substring(total_pages_str.lastIndexOf("page") + 5, total_pages_str.lastIndexOf(">"))
            total_pages = Number(total_pages)
            for (var j = 1; j <= total_pages; j++) {
                const innerpulls = await axios.get("https://api.github.com/repos/" + owner +
                "/" + repo + "/contributors?page=" + j, config);
                innerpulls.data.forEach(function (username: { login: string }) {
                    contriNames.push(username.login)
                });
            }
        return contriNames

        }
        else {
            listOfContributers.data.forEach(function (username: { login: string }) {
                contriNames.push(username.login)
            });
            return contriNames
        }
    }
    catch (error) {
        console.log(error)
        return -1
    }

}

//getContributerNames("ser574-green-team", "taigit");

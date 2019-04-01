import axios from "axios"


/**
 * Gives a list of names of branches in repo.
 *
 * @param owner owner username
 * @param repository repo name
 */
export async function
getBranches(owner : string, repository : string, auth: string) : Promise<Array<string>> {
    try {
        var config = {
            headers: {'Authorization': "Bearer " + auth}
        }
        let response = await axios.get("https://api.github.com/repos/" +
            owner + "/" + repository + "/branches", config);
        let branches: Array<string> = [];
        response.data.forEach(function(branch : {name: string}) {
            branches.push(branch.name);
        })
        return branches;
    } catch (e) {
        console.log(e)
    }
    return []
}

/**
 * gives the number of commits to a branch
 *
 * @param owner repo owner username
 * @param repository repo name
 * @param branch branch name
 */
export async function
getNumBranchCommits(owner : string, repository: string, branch : string, auth : string) :
    Promise<number> {
        try {
            var config = {
                headers: {'Authorization': "Bearer " + auth}
            }
            let response = await axios.get("https://api.github.com/repos/" +
                owner + "/" + repository + "/commits?sha=" + branch, config);
            return response.data.length;
        } catch(e) {
            console.log(e);
        }
        return -1;
    }

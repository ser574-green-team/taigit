import axios from "axios"


/**
 * Lists names of branches in repo
 * 
 * @param owner owner of repo
 * @param repository name of repo
 */
export async function
getBranches(owner : string, repository : string) : Promise<Array<string>> {
    try {
        let response = await axios.get("https://api.github.com/repos/" +
            owner + "/" + repository + "/branches");
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

// Takes the owner, repository and branch name and
// returns the number of commits on that branch.
export async function
getNumBranchCommits(owner : string, repository: string, branch : string) :
    Promise<number> {
        try {
            let response = await axios.get("https://api.github.com/repos/" +
                owner + "/" + repository + "/commits?sha=" + branch);
            return response.data.length;
        } catch(e) {
            console.log(e);
        }
        return -1;
    }

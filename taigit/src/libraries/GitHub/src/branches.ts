import axios from "axios"


/**
 * Returns names of branches in repo
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

/**
 * Returns the number of commits for specified branch.
 * 
 * @param owner owner of repo
 * @param repository name or repo
 * @param branch branch to get number of commits for
 */
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

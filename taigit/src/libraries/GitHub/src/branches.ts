import axios from "axios"

export async function
getBranches(owner : string, repository : string) : Promise<Array<string>> {
    let response = await axios.get("https://api.github.com/repos/" +
        owner + "/" + repository + "/branches");
    let branches: Array<string> = [];
    response.data.forEach(function(branch : {name: string}) {
        branches.push(branch.name);
    })
    return branches;
}

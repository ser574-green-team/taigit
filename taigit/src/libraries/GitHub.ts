import axios from "axios"

export async function
get_branches(owner : string, repository : string) : Promise<Array<string>> {
    let response = await axios.get("https://api.github.com/repos/" +
        owner + "/" + repository + "/branches");
    let branches: Array<string> = [];
    response.data.forEach(function(branch : {name: string}) {
        branches.push(branch.name);
    })
    return branches;
}

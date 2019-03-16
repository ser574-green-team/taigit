import axios from 'axios';

export async function
usesMaven(owner: string, repo: string) : Promise<boolean>{
    return await fileInRepo(owner, repo, "pom.xml");
}

export async function
usesGradle(owner: string, repo: string) : Promise<boolean>{
    return await fileInRepo(owner, repo, "build.gradle");
}

export async function
usesCMake(owner: string, repo: string) : Promise<boolean>{
    console.log("made it here!");
    return await fileInRepo(owner, repo, "CMakeLists.txt");
}

export async function
usesAnt(owner: string, repo: string) : Promise<boolean>{
    return await fileInRepo(owner, repo, "build.xml");
}

export async function 
usesMake(owner: string, repo: string) : Promise<boolean>{
    return await fileInRepo(owner, repo, "Makefile");
}

async function fileInRepo(owner: string, repo: string, filename: string): Promise <boolean>{
    console.log("gonna find the file in the repo!");
    try{
        const branchInfo = await axios.get("https://api.github.com/repos/" + owner + 
        "/" + repo + "/branches/master");
        console.log("got latest commit!");
        let rootSha = branchInfo.data.commit.sha;
        return await fileInTree(owner, repo, rootSha, filename);
    } catch (error){
        console.log(error);
    }
    return false;
}

async function fileInTree(owner: string, repo: string, treeSha: string, filename: string): Promise<boolean>{
    const tree = await axios.get("https://api.github.com/repos/" + owner + "/" +
        repo + "/git/trees/" + treeSha);
    console.log("Got tree!: " + tree.data.tree);
    for (let gitObject of tree.data.tree){
        //if it's a blob, check for pom.xml
        if (gitObject.type === "blob"){
            let objPath = gitObject.path.split("/");
            let objName = objPath[objPath.length -1];
            console.log(objName);
            if (objName === filename){
                console.log("FOUND IT!!!!");
                return true;
            }
        } else if (gitObject.type === "tree"){
            if (await fileInTree(owner, repo, gitObject.sha, filename)){
                console.log("DSJF:SOIUHEEN:FES:OINF");
                return true;
            }
        }
    }
    return false;
}
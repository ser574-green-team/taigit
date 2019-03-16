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
    return await fileInRepo(owner, repo, "CMakeFiles.txt");
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
    try{
        const latestCommit = await axios.get("https://api.github.com/repos/" + owner + 
        "/" + repo + "/git/commits/master");
        let rootSha = latestCommit.data.tree.sha;
        return await fileInTree(owner, repo, rootSha, filename);
    } catch (error){
        console.log(error);
    }
    return false;
}

async function fileInTree(owner: string, repo: string, treeSha: string, filename: string): Promise<boolean>{
    const tree = await axios.get("https://api.github.com/repos/" + owner + "/" +
        repo + "/git/trees/" + treeSha);

    for (let gitObject of tree.data){
        //if it's a blob, check for pom.xml
        if (gitObject.type.localCompare("blob") == 0){
            let objPath = gitObject.path.split("/");
            let objName = objPath[objPath.length -1];
            if (objName.localCompare(filename) == 0){
                return true;
            }
        } else if (gitObject.type.localCompare("tree") == 0){
            if (fileInTree(owner, repo, gitObject.sha, filename)){
                return true;
            }
        }
    }
    return false;
}
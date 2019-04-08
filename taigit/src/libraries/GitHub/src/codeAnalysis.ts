/*
Calculates McCabe cyclomatic complexity of a repository
get cyclomatic complexity of python code
*/

import axios from 'axios';
import { counter } from '@fortawesome/fontawesome-svg-core'; 

/**
 *  check if the file is in the list of approved formats
 * @param fileExt file extension of the specific java file
 * @return bool true if the file is a java, python or c++ file
 */
/*
function 
verifyFormat(fileExt: string) : boolean{
   let bool : boolean = false; 
   if (fileExt === "java" || fileExt === "py" || fileExt === "cpp"){
       bool = true;
   }
   return bool;
}
*/
async function
getNumFiles(owner : string, repo : string, auth : string, path? : string) : Promise<number>{
    let fileCount : number = 0;
    var content;
    var header = {headers:{'Authorization': "Bearer " + auth}};
    try{
        if(path){
            content = await axios.get('https://api.github.com/repos/'+owner+'/'+repo+'/contents/'+path,header);
        }else{
            content = await axios.get('https://api.github.com/repos/'+owner+'/'+repo+'/contents', header);
        }
        //console.log("Content:\n", content);
        for (let obj of content.data){
            if(obj.type == "file"){
                fileCount ++;
            }else if (obj.type == 'dir'){
                fileCount += await getNumFiles(owner, repo, auth,obj.path);
            }
        }
        //console.log(fileCount);
    }catch(error){
        console.log("Error2:\n", error);
    }

    return fileCount;
}
/**
 * 
 * @param owner your user name on codacy
 * @param project your project name on codacy
 * @param token  your codacy token
 * @param ownerGit the github owner name--> in case owner of github repo is different from codacy owner
 * @param gitRepo the github repo name --> in case different from project name
 * @param auth Github auth key  
 */

export async function
getCodeAnalysis(owner: string, project:string, token: string, ownerGit : string, gitRepo : string, auth : string) : Promise<any>{
   var jsonObj;
   try{
    const response = await axios.get('https://taigit-auth.herokuapp.com/codacy/'+owner+"/"+project +"/"+ token);
    let jsonString : string = response.data.commit;
    console.log("JSONstring:\n",jsonString); 
    let jsonObj = JSON.parse(jsonString); 
    let fileCount : number = await getNumFiles(ownerGit, gitRepo, auth);
    jsonObj.fileCount = fileCount;
    console.log(jsonObj);
   }catch(error){
       console.log("Error1:\n", error);
   }
    return jsonObj;
}

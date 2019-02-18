import * as request from 'request';
/**
 * The following program will checkout github pull requests of a particular 
 * user from a particular repo.
 */

 //https://api.github.com/users/ansamant
class getPullReqs{
    
    getpull(userName: string, repoName: string){
        request.get('https://api.github.com/repos/'+userName+repoName+'/pulls?state=all', (response: any)=>{
            console.log(response);
        });

    }
}
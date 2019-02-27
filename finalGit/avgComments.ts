 import axios from 'axios';
 interface Map<T> {
     [K: string]: T;
 }
async function
getNumCommets(owner : string, repo: string,  number : number){
     try{
         const comments = await axios.get("https://api.github.com/repos/" + owner +
             "/" + repo + "/issues/comments");
         let dict : Map<number> = {}
         comments.data.forEach(function(req : {issue_url:string}){
             if(dict.hasOwnProperty(req.issue_url)) {
                 dict[req.issue_url] += 1;
             }
             else{
                 dict[req.issue_url] = 1;
                 }
             })
         let numberOfpullRequests = Object.keys(dict).length;
         let averageNumberOfComments = (numberOfpullRequests/comments.data.length).toFixed(2)
         return averageNumberOfComments;
     }
     catch (error) {
         console.log(error);

     }
     return -1;
 }


 //getNumCommets("ser574-green-team", "taigit", 1);
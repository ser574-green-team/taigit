 import axios from 'axios';


 interface Map<T> {
     [K: string]: T;
 }


export async function
getNumCommets(owner : string, repo: string){
     try{
         let issue_comment = await axios.get("https://api.github.com/repos/" + owner +
             "/" + repo + "/issues/comments");
         //console.log(issue_comment.data)
        // const pullReq_comment = await axios.get("https://api.github.com/repos/" + owner +
        //     "/" + repo + "/issues/" + number + "/comments");

         let dict : Map<number> = {};
         let issueNumberArray = [];
         issue_comment.data.forEach(function(req : {issue_url:string} ) {
            // console.log(req.issue_url);
             let issue_number_array = req.issue_url.split('/');
             let issue_number : string = issue_number_array[issue_number_array.length - 1];
             issueNumberArray.push(issue_number)
             if(dict.hasOwnProperty(issue_number)) {
                 dict[issue_number] += 1;
             }
             else{
                 dict[issue_number] = 1;
                 }

              });

         issueNumberArray.sort()
         let uniqueId = issueNumberArray.filter(function(elem, index, self) {
             return index === self.indexOf(elem);
         })

         for(let id of uniqueId){
                let commentsPerReq  = await getNumberCommentsPerPullRequest(owner,repo,id);
                console.log(commentsPerReq);
                console.log(dict[id]);
                if(dict.hasOwnProperty(id)) {
                    dict[id] = dict[id] + Number(commentsPerReq);
                   }
         }
         //console.log(dict)
         let numberOfpullRequests = Object.keys(dict).length;
         let averageNumberOfComments  = (Number(numberOfpullRequests)/uniqueId.length).toFixed(2)
         console.log(Number(averageNumberOfComments));
         return Number(averageNumberOfComments);

     }
     catch (error) {
         console.log(error);

     }
     return -1;
 }
export async function
getNumberCommentsPerPullRequest(owner : string, repo: string,  number : number){
     try {
         let pullReq_comment = await axios.get("https://api.github.com/repos/" + owner +
             "/" + repo + "/pulls/" + number + "#/comments");
         //console.log(pullReq_comment.data["comments"])
         let commentsPerReq = pullReq_comment.data["comments"]
         return  Number(commentsPerReq);
        // console.log(pullReq_comment.data["comments"]);
     }
     catch (error) {
         console.log(error)
         return -1

     }
 }
 getNumCommets("ser574-green-team", "taigit");
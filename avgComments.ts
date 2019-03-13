 import axios from 'axios';

export async function
getNumCommets(owner : string, repo: string){
     try{
         let issue_comment = await axios.get("https://api.github.com/repos/" + owner +
             "/" + repo + "/issues?state=closed");
         let lengthOfClosedPullRequests = issue_comment.data.length
         let issueNumberArray = Array()
         console.log(lengthOfClosedPullRequests)
         let totalComments = 0
         issue_comment.data.forEach(function(req : {url:string} ) {
             let closedIssueNumberArray = req.url.split('/');
             let issue_number: string = closedIssueNumberArray[closedIssueNumberArray.length - 1];
             issueNumberArray.push(issue_number)

         });
         for(let issue_number of issueNumberArray){
         let commentsPerIssue = await getNumberCommentsPerPullRequest(owner,repo,Number(issue_number))
         totalComments = totalComments + Number(commentsPerIssue)
         console.log("Comments for Issue "+issue_number+" = " + Number(commmentsPerIssue))}

         console.log(totalComments)
         let averageNoOfComments = (totalComments/lengthOfClosedPullRequests).toFixed(2)
         console.log(averageNoOfComments)
         return averageNoOfComments;

     }
     catch (error) {
         console.log(error);
         return -1;

     }

 }
 export async function
 getNumberCommentsPerPullRequest(owner : string, repo: string,  number : number){
     try {
         let issue_comment = await axios.get("https://api.github.com/repos/" + owner +
             "/" + repo + "/pulls/" + number + "#/comments");
         let comments = issue_comment.data["comments"]
         let reviewComments = issue_comment.data["review_comments"]
       //  console.log(comments)
       //  console.log(reviewComments)
         let totalNumberOfComments = Number(comments) + Number(reviewComments)
         return Number(totalNumberOfComments)
     }
     catch (error) {
         console.log(error)
         return -1

     }

 }


 getNumCommets("ser574-green-team", "taigit");


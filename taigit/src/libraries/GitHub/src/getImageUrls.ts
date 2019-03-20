/* The following function returns the list of all contributer imageUrls in a
* respository.
* @param owner  The name of the owner of the repository in String format.
* @param repo   The name of the Github repository in String format.
* @return       The list consisting of avatarURLs of All Contributers in the repo.
*/

import axios from "axios";
export async function
getImageUrls(owner : string, repo: string){
    try{
        let listOfContributers = await axios.get("https://api.github.com/repos/" + owner +
            "/" + repo + "/contributors");
        let imageUrls : Array<string> = [];
        listOfContributers.data.forEach(function (imageUrl :{avatar_url: string}){
            console.log(imageUrl.avatar_url)
            imageUrls.push(imageUrl.avatar_url)
        });
        return imageUrls
    }
    catch (error) {
        console.log(error)
        return -1
    }
}



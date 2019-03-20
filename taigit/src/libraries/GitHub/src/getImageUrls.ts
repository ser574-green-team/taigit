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
        console.log(imageUrls)
        return imageUrls
    }
    catch (error) {
        console.log(error)
        return -1
    }
}


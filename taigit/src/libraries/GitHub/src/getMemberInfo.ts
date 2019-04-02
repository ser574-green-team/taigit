import axios from 'axios';
/**
 * The following function returns an Array of Arrays. Each indexed array consists of two
 * fields viz. the username of the member and the avatar_url of the member.
 * This method returns both Private and Public members if the user is authenticated and
 * a member of that particular organization.
 * @param owner  The name of the owner of the repository in String format.
 * @param repo   The name of the Github repository in String format.
 * @return       An Array Of Arrays consisting of username and avatar urls.
 */
export async function
getMemberInfo(organization : string, auth : string){
    try {
        let arrayOfUser  = Array()
        var config = {
            headers: {'Authorization': "Bearer " + auth}
        }
        let memberInfo = await axios.get("https://api.github.com/orgs/"+organization+"/members", config);
        console.log('memberInfo from call: ', memberInfo);
        memberInfo.data.forEach(function (req: { login: string, avatar_url: string }) {
            arrayOfUser.push([req.login,req.avatar_url])
        })
        return(arrayOfUser)
    }
    catch (error) {
        console.log(error)
        return -1
    }

}


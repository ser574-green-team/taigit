import axios from 'axios'

/**
 * Returns bytes of code of each programming language used in the
 * github repo
 * @param owner 
 * @param repo 
 * @param auth 
 */
export async function
getBytesOfCode(owner: string, repo : string, auth : string): Promise<any>{
    try{
        var config = {
            headers: {'Authorization': "Bearer " + auth}
        }
        const getBytes = await axios.get('https://api.github.com/repos/'+owner + 
            '/' + repo + '/languages', config);
        
        return getBytes.data;
    }catch(error){
        console.log("Error Bytes:\n", error);
    }
    return -1;
}
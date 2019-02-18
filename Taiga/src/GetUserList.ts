import * as request from 'request';

export class GetUserList{
    getUserList(tokenId: any, projName: string) {
        let tok = 'Bearer ' + tokenId;
        let options: any = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : tok,
            },
            json: true
        }
        request.get('https://api.taiga.io/api/v1/projects/by_slug?slug=' + projName, options, (error:any, response: any, body:any) => {
            let someArray = body.members;
            let content:any;
            for (content of someArray) {
                console.log("Full name:: " + content.full_name);
            }
        });

    }

}

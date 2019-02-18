import * as request from 'request';
import {User} from './User';

export class GetUserAuthToken{
    
    getUserAuthToken(cb:(user: User) => any) {

        let postData = {
            username: "bpanda1@asu.edu", 
            password: "Data@123", 
            type: "normal"
        }
        let options: any = {
            headers: { 
                'User-Agent' :'request',
                'Content-Type': 'application/json',
            },
            body: postData,
            json: true
        }
        request.post('https://api.taiga.io/api/v1/auth', options, (error:any, response: any, body:any) => {
            let user = new User(body);
            cb(user);
        });
        

    }
}
import {User} from './User';
//import {StoreResponse} from './StoreResponse';
import {GetUserAuthToken} from './GetUserAuthToken';
import {GetUserList} from './GetUserList';
import {GetTaskCount} from './GetTaskCount';
import {GetMileStoneIds} from './GetMileStoneIds';

let tokenId:any ;
let authObj = new GetUserAuthToken();

authObj.getUserAuthToken((user: User) => {
      tokenId = user.tokenId;
      let userListObj = new GetUserList();
      userListObj.getUserList(tokenId, 'sarthak-scrumdevils-ser_515', (respForFutureExtraction: any) => {
        console.log("respForFutureExtraction :: " + respForFutureExtraction.members);

        let sprintIds = new GetMileStoneIds();
        sprintIds.getMileStoneIds(tokenId, 'sarthak-scrumdevils-ser_515', respForFutureExtraction);



      });
});

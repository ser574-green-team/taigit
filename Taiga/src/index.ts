import {User} from './User';
import {GetUserAuthToken} from './GetUserAuthToken';
import {GetUserList} from './GetUserList';
import {GetMileStoneIds} from './GetMileStoneIds';

let tokenId:any ;
let authObj = new GetUserAuthToken();

//sanaydevi-ser-574
//sarthak-scrumdevils-ser_515

authObj.getUserAuthToken((user: User) => {
      tokenId = user.tokenId;
      let userListObj = new GetUserList();
      userListObj.getUserList(tokenId, 'sanaydevi-ser-574', (respForFutureExtraction: any) => {
        let sprintIds = new GetMileStoneIds();
        sprintIds.getMileStoneIds(tokenId, respForFutureExtraction);
      });
});

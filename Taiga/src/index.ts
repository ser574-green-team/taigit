import {User} from './User';
import {GetUserAuthToken} from './GetUserAuthToken';
import {GetUserList} from './GetUserList';

let tokenId:any ;
let authObj = new GetUserAuthToken();

authObj.getUserAuthToken((user: User) => {
      tokenId = user.tokenId;
      let userListObj = new GetUserList();
      userListObj.getUserList(tokenId, 'sarthak-scrumdevils-ser_515');
});

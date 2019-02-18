export class User {
	tokenId : number;
	constructor(authResp: any){
		this.tokenId = authResp.auth_token;
	}
}

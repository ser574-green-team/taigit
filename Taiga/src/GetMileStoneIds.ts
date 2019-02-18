import * as request from 'request';

export class GetMileStoneIds {
    getMileStoneIds(tokenId: any, projName: string, respForFutureExtraction:any) {
        let sprintDetailsArray: any;
        let sprintNameArray: any;
        sprintDetailsArray = respForFutureExtraction.milestones;
        let sprintDetail:any;
        for (sprintDetail of sprintDetailsArray) {
            let sprintId = sprintDetail.id;
            console.log(sprintId);
            // sprintId will be used to get all the sprint details
            this.printSprintIds(tokenId, sprintId, (projectId: any) => {
                // we need to call task details here.
                console.log("projectId :: " + projectId);
            });;
            
        }
    }

    printSprintIds(tokenId: number, sprintId: string, callB:(projectId:any) => any) {
        let tok = 'Bearer ' + tokenId;
        let options: any = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : tok,
            },
            json: true
        }

        request.get('https://api.taiga.io/api/v1/milestones/' + sprintId, options, (error:any, response: any, body:any) => {
            console.log("body.project_extra_info.id: " + body.project_extra_info.id);
            callB(body.project_extra_info.id);
            
        });
    }
    
}

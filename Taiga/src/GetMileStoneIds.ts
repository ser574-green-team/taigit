import * as request from 'request';

export class GetMileStoneIds {
    getMileStoneIds(tokenId: any, projName: string, respForFutureExtraction:any) {
        let sprintDetailsArray: any;
        let sprintNameArray: any;
        sprintDetailsArray = respForFutureExtraction.milestones;
        let sprintDetail:any;
        let sprintId:any;
        for (sprintDetail of sprintDetailsArray) {
            sprintId = sprintDetail.id;
            //console.log(sprintId);
            // sprintId will be used to get all the sprint details

            this.printSprintIds(tokenId, sprintId, (projectId: any) => {
                // we need to call task details here.
                //console.log(sprintId + " projectId :: " + projectId);
                this.printTaskCount(tokenId, sprintId, projectId, (taskCount:any) => {
                    //console.log("taskCount:any :: " + taskCount);
                    for(let key in taskCount) {
                        let value = taskCount[key];
                        console.log( "For " + value + ", " + key);
                       
                      }
                }); 
            });
            
        }
    }

    printTaskCount (tokenId: number, sprintId: string, projectId : any, callB:(taskCount:any) => any) {
        let tok = 'Bearer ' + tokenId;
        let options: any = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization' : tok,
            },
            json: true
        }
        let dict:any = {};
        //console.log("task   " + sprintId + "  " + projectId);
        request.get('https://api.taiga.io/api/v1/tasks?milestone=' + sprintId + "&&project=" + projectId , options, (error:any, response: any, body:any) => {
            for (let taskName of body) {
                let name = taskName.assigned_to_extra_info.full_name_display;
                let sub = taskName.subject;
                //console.log( "name :: " +name);
                let x:any;
                if( name in dict) {
                    x = dict[name];
                    dict[name] = x+1
                } else {
                    dict[name] = 1;
                }

            }
            callB(dict);
            
        });
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
            callB(body.project_extra_info.id);
            
        });
    } 
    
}

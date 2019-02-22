import axios from "axios";
import request from "request";
import { callbackify } from "util";

export async function
taiga_login(username : string, password : string) : Promise<boolean> {
    let response = await axios.post("https://api.taiga.io/api/v1/auth", {
        "password": password,
        "type": "normal",
        "username": username
    })
    
    return (response.status == 200);
}

// This call returns key project information
export async function
project_info(slug : string) : Promise<Object> {
    let data = await axios.get("https://api.taiga.io/api/v1/projects/by_slug?slug=" + slug)
    let info : {id: number, name: string, slug: string, created_date: Date} = 
        {id: data.data.id, name: data.data.name, slug: data.data.slug, created_date: data.data.created_date};
    return (info);
}

// This call returns project stats based on project id
export async function
project_stats(projId : number) : Promise<Object> {
    let data = await axios.get("https://api.taiga.io/api/v1/projects/" + projId.toString() + '/stats');
    
    return (data.data);
}

// This returns an array of member's full name in a project 
export async function
getUserList(projName: string, callB:(body: any, membersInProject: any) => any) {
    let options: any = {
        headers: { 
            'Content-Type': 'application/json',
        },
        json: true
    }
    request.get('https://api.taiga.io/api/v1/projects/by_slug?slug=' + projName, options, (error:any, response: any, body:any) => {
        let content:any;
        let membersInProject = [];
        for (content of body.members) {
            membersInProject.push(content.full_name);
        }
        callB(body, membersInProject);
    });

}

/* This function returns an Array for each member with below details:
inProgressTaskCount: 3
name: "Cecilia La Place"
newTaskCount: 1
sprintName: "Sprint 2 - Taiga"
taskReadyForTestCount: 0
taskWithUnknownStatusCount: 0
totalTaskCount: 4
*/
export async function
getMileStoneIds(respForFutureExtraction:any, callB:(taskCountDetails:any) => any) {
    let sprintDetailsArray: any;
    sprintDetailsArray = respForFutureExtraction.milestones;
    let sprintDetail:any;
    
    for (sprintDetail of sprintDetailsArray) {
        getSprintIds(sprintDetail, ( projectId: any, sprintId: any, sprintName: any) => {
            // we need to call task details here.
            getTaskDetails(sprintId, projectId, sprintName, (taskCountDetails:any) => {
                callB(taskCountDetails);
            }); 
        });
        
    }
}

export async function
getSprintIds(sprintDetail: any, callB:(projectId:any, sprintId: any, sprintName:any) => any) {
    let sprintId:any, projectId: any, sprintName:any;
    let options: any = {
        headers: { 
            'Content-Type': 'application/json',
        },
        json: true
    }
    sprintId = sprintDetail.id; 
    sprintName = sprintDetail.name;
            
    request.get('https://api.taiga.io/api/v1/milestones/' + sprintId, options, (error:any, response: any, body:any) => {
        projectId = body.project_extra_info.id;
        callB(projectId, sprintId, sprintName);
        
    });
}

export async function
getTaskDetails (sprintId: string, projectId : any, sprintName: any, callB:(taskCount:any) => any) {
    
    let options: any = {
        headers: { 
            'Content-Type': 'application/json',
        },
        json: true
    }
    let dictTaskCount:any = {};
    let jsonObj : any = {};
    let bigObj : any = [];
    request.get('https://api.taiga.io/api/v1/tasks?milestone=' + sprintId + "&&project=" + projectId , options, (error:any, response: any, body:any) => {
        for (let taskName of body) {
            let name = taskName.owner_extra_info.full_name_display;
            let taskStatusName = taskName.status_extra_info.name;
            let taskStatus = taskName.status_extra_info.is_closed;
            let nameKey:any;
            if (name in dictTaskCount) {
                nameKey = dictTaskCount[name];
                dictTaskCount[name] = nameKey+1;
                
                for (let i = 0; i < bigObj.length; i ++ ) {
                    if (name === bigObj[i].name) {
                        bigObj[i].totalTaskCount = bigObj[i].totalTaskCount + 1;
                        if (taskStatus === true) {
                            bigObj[i].closedTaskCount = bigObj[i].closedTaskCount + 1;
                        } else {
                            if (taskStatusName === "Ready for test") {
                                bigObj[i].taskReadyForTestCount = bigObj[i].taskReadyForTestCount + 1;
                            } else if (taskStatusName === "In progress") {
                                bigObj[i].inProgressTaskCount = bigObj[i].inProgressTaskCount + 1;
                            } else if (taskStatusName === "New") {
                                bigObj[i].newTaskCount = bigObj[i].newTaskCount + 1;
                            }
                            else {
                                bigObj[i].taskWithUnknownStatusCount = bigObj[i].taskWithUnknownStatusCount + 1;
                            }
                        }
                        
                    }
                }    
            } else {
                // This block will execute only once for 
                // for each team member
                dictTaskCount[name] = 1;
                jsonObj={};
                jsonObj['name'] = name;
                jsonObj['sprintName'] = sprintName;
                jsonObj['totalTaskCount'] = 1;
                jsonObj['taskReadyForTestCount'] = 0;
                jsonObj['inProgressTaskCount'] = 0;
                jsonObj['newTaskCount'] = 0;
                jsonObj['taskWithUnknownStatusCount'] = 0;
                jsonObj['closedTaskCount'] = 0;
                
                if (taskStatus === true) {
                    jsonObj['closedTaskCount'] = 1;
                } else {
                    if (taskStatusName === "Ready for test") {
                        jsonObj['taskReadyForTestCount'] = 1;
                    } else if (taskStatusName === "In progress") {
                        jsonObj['inProgressTaskCount'] = 1;
                    } else if (taskStatusName === "New") {
                        jsonObj['newTaskCount'] = 1;
                    } else {
                        jsonObj['taskWithUnknownStatusCount'] = 1
                    }
                }
                bigObj.push(jsonObj);
            }
        }
        callB(bigObj);
    });
}
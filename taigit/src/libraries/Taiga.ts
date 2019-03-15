import axios from "axios"

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

//This call returns sprint stats based on sprintId
export async function
sprint_stats(sprintId : number) : Promise<Object> {
    let data = await axios.get("https://api.taiga.io/api/v1/milestones/"+sprintId.toString()+ '/stats');
     return (data.data);
}

//This call returns user story  stats based on userstory Id
export async function
userstory_statuses(userstoryId : number) : Promise<Object> {
    let data = await axios.get("https://api.taiga.io/api/v1/userstory-statuses/"+userstoryId.toString());
    //test link:  https://api.taiga.io/api/v1/userstory-statuses/1124228
    return (data.data)
}

//This call returns task stats based on task Id
export async function
task_statuses(taskId : number) : Promise<Object> {
    let data = await axios.get("https://api.taiga.io/api/v1/task-statuses/" + taskId.toString());
    //test link:  https://api.taiga.io/api/v1/task-statuses/1550500
    return (data.data)
}

/**
 * @summary Get the History for a task
 * @param taskId the ID for the task to get history for
 * @returns array of history objects
 * {
 *      date : number,         // Date and time of history entry in milliseconds since epoch
 *      user : object,         // Taiga User Object
 *      diff_types : String[], // Names of entries in diff_values
 *      diff_values : Object   // Values of the changes listed in diff_types
 * }
 */
export async function
task_history(taskId : number) : Promise<Object> {
    let data = (await axios.get(`https://api.taiga.io/api/v1/history/task/${taskId}`)).data;

    let output : Array<Object> = [];
    for(let entry of data) {
        let new_entry = {
            date : new Date(entry.created_at).getTime(),
            user : entry.user,
            diff_types : Object.keys(entry.diff),
            diff_values : entry.values_diff
        }
        output.push(new_entry);
    }

    return output;
}

/**
 * @summary Get the Task count with its status for each sprint
 * @param projName project/slug Name
 * @returns array of each members along with task count for all sprints 
 * {
 *      inProgressTaskCount: number
 *      name: string
 *      newTaskCount: number
 *      sprintName: string
 *      taskReadyForTestCount: number
 *      taskWithUnknownStatusCount: number
 *      totalTaskCount: number 
 * }
 */
export async function
getTaskStatusCount(projName: string): Promise<Object> {
    let response = await axios.get('https://api.taiga.io/api/v1/projects/by_slug?slug=' + projName);
    
    let sprintDetailsArray = response.data.milestones;
    
    let totalTaskDetails: any = [];
    // Project Id will be same for a project, so calculate only once with first sprint Id
    let sprintId = sprintDetailsArray[0].id;
    let projectId = await getProjectId(sprintId);

    for (let sprintDetail of sprintDetailsArray) {
        let sprintId = sprintDetail.id;
        let sprintName = sprintDetail.name;
        let taskCountDetailsInASprint =  getTaskDetails(sprintId, projectId, sprintName);
        
        totalTaskDetails.push(taskCountDetailsInASprint);
    }
    return (totalTaskDetails);
}

/**
 * @summary Get the projectId
 * @param sprintId sprint/Milestone Id
 * @returns project Id of the sprint 
 */

export async function
getProjectId(sprintId: number) : Promise<Object> {
    let response = (await axios.get(`https://api.taiga.io/api/v1/milestones/${sprintId}`));
    return (response.data.project_extra_info.id);
}

/**
 * @summary Get the Task count with its status for a sprint in  a project
 * @param sprintId : Milestone Id 
 * @param projectId: Project Id 
 * @param sprintName: Sprint name
 * @returns array of each members along with task count for a single sprint 
 * {
 *      inProgressTaskCount: number
 *      name: string
 *      newTaskCount: number
 *      sprintName: string
 *      taskReadyForTestCount: number
 *      taskWithUnknownStatusCount: number
 *      totalTaskCount: number 
 * }
 */

async function
getTaskDetails(sprintId: number, projectId: any, sprintName: string)  : Promise<Object> {

    let dictTaskCount: any = {};
    let jsonObj: any = {};
    let bigObj: any = [];
    let response = (await axios.get(`https://api.taiga.io/api/v1/tasks?milestone=${sprintId}&&project=${projectId}`)).data;
    
    for (let taskName of response) {
        let name : string;
        if (taskName.assigned_to_extra_info != null) {
            name = taskName.assigned_to_extra_info.full_name_display;
        } else {
            name = taskName.owner_extra_info.full_name_display;
        }
        let taskStatusName = taskName.status_extra_info.name;
        let taskStatus = taskName.status_extra_info.is_closed;
        let nameKey: any;
        if (name in dictTaskCount) {
            nameKey = dictTaskCount[name];
            dictTaskCount[name] = nameKey + 1;

            for (let i = 0; i < bigObj.length; i++) {
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
            jsonObj = {};
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
    return(bigObj);
}
import axios from "axios"

// Interfaces
/**
 * @summary interface for project info
 * @param id : number,          // Project id
 * @param name : string,        // Project name
 * @param created_date : number // Date project was created
 */
interface prj_info {
    id: number, 
    name: string, 
    created_date: Date, 
}

/**
 * @summary interface for project stats
 * @param assigned_pts : number,              // Number of assigned points
 * @param assigned_pts_per_role : Object[],   // Distribution of assigned points across roles
 * @param closed_pts : number,                // Number of closed points
 * @param closed_pts_per_role : Object[],     // Point distribution based on roles
 * @param num_sprints : number,               // Number of sprints
 * @param total_pts : number,                 // Total points in the project
 */
interface prj_stats {
    assigned_pts: number, 
    assigned_pts_per_role: Object[], 
    closed_pts: number, 
    closed_pts_per_role: Object[],
    num_sprints: number, 
    total_pts: number
}

/**
 * @summary interface for sprint stats
 * @param completed_pts : Object[],    // Distribution of completed points across roles
 * @param total_pts : Object[],        // Total number of points
 * @param completed_tsks : number,     // Number of completed tasks
 * @param total_tsks : number,         // Total number of tasks
 * @param completed_us : number,       // Number of completed user stories
 * @param total_us : number,           // Total number of user stories
 * @param sprint_start : string,       // Sprint start date as a string
 * @param sprint_end : string,         // Sprint end date as a string
 * @param burndown : Object[],         // Array object containing date(string), open_points(number), optimal_points(number)
 */
interface spr_stats {
    completed_pts: Object[], 
    total_pts: number, 
    completed_tsks: number, 
    total_tsks: number, 
    completed_us: number, 
    total_us: number, 
    sprint_start: string, 
    sprint_end: string,
    burndown: Object[]
}


// API Calls
/**
 * @summary Return the response for a login
 * @param username the username to login with
 * @param password the password to login with
 * @returns boolean dictating success of login
 */
export async function
taiga_login(username : string, password : string) : Promise<boolean> {
    let response = await axios.post("https://api.taiga.io/api/v1/auth", {
        "password": password,
        "type": "normal",
        "username": username
    })

    return (response.status == 200);
}

/**
 * @summary Get the project information for a slug
 * @param slug the url name of the project
 * @returns prj_info interface
 */
export async function
project_info(slug : string) : Promise<Object> {
    let data = await axios.get("https://api.taiga.io/api/v1/projects/by_slug?slug=" + slug)
    let info : prj_info = {id: data.data.id, name: data.data.name, 
                           created_date: data.data.created_date};
    return (info);
}

/**
 * @summary Get the stats of a project
 * @param projId the ID for project to get stats of
 * @returns prj_stats interface
 */
export async function
project_stats(projId : number) : Promise<Object> {
    let data = await axios.get("https://api.taiga.io/api/v1/projects/" + projId.toString() + '/stats');
    let info : prj_stats = {assigned_pts: data.data.assigned_points, 
                            assigned_pts_per_role: data.data.assigned_points_per_role, 
                            closed_pts: data.data.closed_points, closed_pts_per_role: data.data.closed_points_per_role,
                            num_sprints: data.data.total_milestones, total_pts: data.data.total_points};
    return (info);
}

/**
 * @summary Get the stats for a sprint
 * @param sprintId the ID for the sprint to get stats for
 * @returns spr_stats interface
 */
export async function
sprint_stats(sprintId : number) : Promise<Object> {
    let data = await axios.get("https://api.taiga.io/api/v1/milestones/"+sprintId.toString()+ '/stats');
    let info : spr_stats = {completed_pts: data.data.completed_points, total_pts: data.data.total_points, 
                            completed_tsks: data.data.completed_tasks, total_tsks: data.data.total_tasks,
                            completed_us: data.data.completed_userstories, total_us: data.data.total_userstories,
                            sprint_start: data.data.estimated_start, sprint_end: data.data.estimated_finish,
                            burndown: data.data.days};
    return (info);
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
* @summary This call returns total points of a user story based on user story Id
* @param userstoryId the ID for the User Story to get total points for
    * @returns total points
*/

export async function
userstory_total_points(userstoryId : number) : Promise<Object> {
    let data = await axios.get("https://api.taiga.io/api/v1/userstories/" + userstoryId.toString());
    //test link:  https://api.taiga.io/api/v1/userstories/2698838
    let info : {total_points: number} = {total_points: data.data.total_points};
    return (info);
}

/**
 * @summary This call returns user stats based on user Id
 * @param user Id the ID for the user to get stats for
 * @returns array of history objects
 * {
      total_num_projects: number
      roles: string
      total_num_contacts: number
      total_num_closed_userstories: number
 * }
 */

    export async function
    user_stats(userId : number) : Promise<Object> {
        let data = await axios.get("https://api.taiga.io/api/v1/users/"+userId.toString() + '/stats');
        //test link: https://api.taiga.io/api/v1/users/321272/stats
        let info : {total_num_projects: number, roles: string, total_num_contacts: number, total_num_closed_userstories: number} =
            {total_num_projects: data.data.total_num_projects, roles: data.data.roles, total_num_contacts: data.data.total_num_contacts, total_num_closed_userstories: data.data.total_num_closed_userstories};
        return (info);
    }

/**
 * @summary This call returns project wiki based on project Id
 * @param project Id the ID for the project to get Wiki for
 * @returns project wiki
 */

export async function
project_wiki(projectId : number) : Promise<Object> {
    let data = await axios.get("https://api.taiga.io/api/v1/wiki?project="+projectId.toString());
    //test link: //https://api.taiga.io/api/v1/wiki?project=309976
    //test2: 286226
    return (data.data);
}

/**
 * @summary Get a list of issues for a project
 * @param projId the ID for the project to get list of issues from
 * @returns array of issue objects
 * {
 *      date : number,         // Date and time of history entry in milliseconds since epoch
 *      note : String,         // Taiga User Object
 *      blocked : boolean,     // Is issue blocked
 *      closed : boolean,      // Is issue closed
 *      sprint : number,       // Sprint the issue is in
 *      priority : number      // Issue priority
 * }
 */
export async function
taiga_issues(projId : number) : Promise<Object>{
    let data = (await axios.get(`https://api.taiga.io/api/v1/issues?project=${projId}`)).data;
    let output : Array<Object> = [];
    for(let entry of data) {
        let new_entry = {
            date : new Date(entry.created_date).getTime(),
            note : entry.blocked_note,
            blocked : entry.is_blocked,
            closed : entry.is_closed,
            sprint : entry.milestone,
            priority : entry.priority
        }
        output.push(new_entry);
    }
    return output;
}




/**
 * @summary This call assess a task based on task_assessment_state_trans based on task Id
 * @param taskId the ID for the task to assess task
 * @returns  whether the task's state transition is valid,task status transition, date based on task Id
 * * {
 *      state_trans_invalid: Boolean       // true, the task state transition is not valid; false, the task is valid.
 *      date : number,         // Date and time of history entry in milliseconds since epoch
 *      user : object,         // Taiga User Object
 *      status_trans:entry.String[],//Status transition array
 *
 * }
 */
export async function
task_assessment_state_trans(taskId : number) : Promise<Object> {
let data = (await axios.get(`https://api.taiga.io/api/v1/history/task/${taskId}`)).data;
    //test case :https://api.taiga.io/api/v1/history/task/2577741
let output : Array<Object> = [];
for(let entry of data) {
    let new_entry = {
        state_trans_invalid: false,
        date : new Date(entry.created_at).getTime(),
        user : entry.user,
        status_trans : entry.values_diff.status
    }

    //Only three status transistion is valid
    //which is  ["New", "In progress"] ["In progress", "Ready for test"]  ["Ready for test", "Closed"])
    let old_status = new_entry.status_trans[0];
    let new_status = new_entry.status_trans[1];
    if((old_status == "New"            && new_status != "In progress") ||
        (old_status == "In progress"    && new_status != "Ready for test") ||
        (old_status == "Ready for test" && new_status != "Closed"))
        new_entry.state_trans_invalid= true;
    output.push(new_entry);
}

return output;
}


/**
 * @summary This call return a task current end status and estimated finished percentage based on task Id
 * @param taskId the ID for the task to assess task
 * @returns  whether the task is abnormal,task status transition, date based on task Id
 * * {
 * 
 *      finished: Boolean           // true, the task is finished.
 *      fin_per: number            // finished percentage % default [0%,10%,60%,100%]
 *      end_status: string,       // current task status  ["New", "In progress","Ready for test", "Closed"]
 *      num_stat:number           // current task status [0 1 2 3] corresponding to string in end_status
 *
 * }
 */
export async function
task_assessment_endstate(taskId : number) : Promise<Object> {

    let data = (await axios.get(`https://api.taiga.io/api/v1/history/task/${taskId}`)).data;
    //test case :https://api.taiga.io/api/v1/history/task/2577741   or 2555550
    let output : Array<Object> = [];
    let endstatus : string = "New";
    for(let entry of data) {
        let new_entry = {
            state_trans_invalid: false,
            date : new Date(entry.created_at).getTime(),
            user : entry.user,
            status_trans:entry.values_diff.status
        }
        endstatus = new_entry.status_trans[1];
        output.push(new_entry);
    }


    let t_fin_per : number;
    let t_num_stat : number;
    let t_finished : boolean = false;
    if(endstatus == "Closed") {
        t_finished = true;
     }


    //transfer ["New", "In progress"] ["In progress", "Ready for test"]  ["Ready for test", "Closed"])
    //into number status
    switch(endstatus){
        case "Closed":{
            t_fin_per = 100;
            t_num_stat = 3;
            break;
        }
        case "Ready for test":{
            t_fin_per = 60;
            t_num_stat = 2;
            break;
        }
        case "In progress":{
            t_fin_per = 10;
            t_num_stat = 1;
            break;
        }
        case "New":{
            t_fin_per = 60;
            t_num_stat = 0;
            break;
        }
        default:{
            t_fin_per = 0;
            t_num_stat = 0
            break;
        }
    }

    let info : {finished : boolean, end_status : string,num_stat : number,fin_per : number}
    = {finished : t_finished, end_status : endstatus, num_stat : t_num_stat,fin_per : t_fin_per};
    return (info);
}

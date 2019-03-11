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
 * @summary This call assess a task based on task_assessment_state_trans based on task Id
 * @param taskId the ID for the task to assess task
 * @returns  whether the task's state transition is valid,task status transition, date based on task Id
 * * {
 * Current in Use
 *      state_trans_invalid: Boolean       // true, the task state transition is not valid; false, the task is valid.
 *      date : number,         // Date and time of history entry in milliseconds since epoch
 *      user : object,         // Taiga User Object
 *      status_trans:entry.String[],//Status transition array
 *
 *  Can be added
 *      diff_types : String[], // Names of entries in diff_values //diff_values : entry.values_diff,
 *      diff_values : Object   // Values of the changes listed in diff_types //diff_values : entry.values_diff,
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
        status_trans:entry.values_diff.status
    }

    //Only three status transistion is valid
    //which is  ["New", "In progress"] ["In progress", "Ready for test"]  ["Ready for test", "Closed"])
    if((new_entry.status_trans[0]!="New"&&new_entry.status_trans[1]!="In progress")
        &&(new_entry.status_trans[0]!="In progress"&&new_entry.status_trans[1]!="Ready for test")
        &&(new_entry.status_trans[0]!="Ready for test"&&new_entry.status_trans[1]!="Closed"))
        new_entry.state_trans_invalid= true;
    output.push(new_entry);
}

return output;
}

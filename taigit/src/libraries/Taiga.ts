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

// This returns an array of member's full name in a project 
export async function
getUserList(projName: string) : Promise<Object> {
    let response = await axios.get('https://api.taiga.io/api/v1/projects/by_slug?slug=' + projName);
    let membersInProject = [];
    for (let content of response.data.members) {
        membersInProject.push(content.full_name);
    }
    return(membersInProject);
}
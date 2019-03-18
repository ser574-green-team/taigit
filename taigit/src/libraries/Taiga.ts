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

//This call returns sprint stats based on sprint_id
export async function
sprint_stats(sprint_id : number) : Promise<Object> {
    let data = await axios.get("https://api.taiga.io/api/v1/milestones/"+sprint_id.toString()+ '/stats');
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
 *      inprogress_task_count: number
 *      name: string
 *      new_task_count: number
 *      sprint_name: string
 *      task_ready_for_test_count: number
 *      task_with_unknown_status_count: number
 *      total_task_count: number 
 * }
 */
export async function
get_task_status_count(project_id: number): Promise<Object> {
    let sprint_details_array = (await axios.get(`https://api.taiga.io/api/v1/projects/${project_id}`)).data.milestones;
    let total_task_details: any = [];
    
    for (let sprint_detail of sprint_details_array) {
        let sprint_id = sprint_detail.id;
        let sprint_name = sprint_detail.name;
        let task_count_details_in_a_sprint =  get_task_details(sprint_id, project_id, sprint_name);
        
        total_task_details.push(task_count_details_in_a_sprint);
    }
    return (total_task_details);
}

/**
 * @summary Get the Task count with its status for a sprint in  a project
 * @param sprint_id : Milestone Id 
 * @param project_id: Project Id 
 * @param sprint_name: Sprint name
 * @returns array of each members along with task count for a single sprint 
 * {
 *      inprogress_task_count: number
 *      name: string
 *      new_task_count: number
 *      sprint_name: string
 *      task_ready_for_test_count: number
 *      task_with_unknown_status_count: number
 *      total_task_count: number 
 * }
 */

async function
get_task_details(sprint_id: number, project_id: any, sprint_name: string)  : Promise<Object> {

    let dict_task_count: any = {};
    let json_obj: any = {};
    let big_obj: any = [];
    let response = (await axios.get(`https://api.taiga.io/api/v1/tasks?milestone=${sprint_id}&&project=${project_id}`)).data;
    
    for (let task_name of response) {
        let name : string;
        if (task_name.assigned_to_extra_info != null) {
            name = task_name.assigned_to_extra_info.full_name_display;
        } else {
            name = task_name.owner_extra_info.full_name_display;
        }
        let task_status_name = task_name.status_extra_info.name;
        let task_status = task_name.status_extra_info.is_closed;
        let nameKey: any;
        if (name in dict_task_count) {
            nameKey = dict_task_count[name];
            dict_task_count[name] = nameKey + 1;

            for (let i = 0; i < big_obj.length; i++) {
                if (name === big_obj[i].name) {
                    big_obj[i].total_task_count = big_obj[i].total_task_count + 1;
                    if (task_status === true) {
                        big_obj[i].closed_task_count = big_obj[i].closed_task_count + 1;
                    } else {
                        if (task_status_name === "Ready for test") {
                            big_obj[i].task_ready_for_test_count = big_obj[i].task_ready_for_test_count + 1;
                        } else if (task_status_name === "In progress") {
                            big_obj[i].inprogress_task_count = big_obj[i].inprogress_task_count + 1;
                        } else if (task_status_name === "New") {
                            big_obj[i].new_task_count = big_obj[i].new_task_count + 1;
                        }
                        else {
                            big_obj[i].task_with_unknown_status_count = big_obj[i].task_with_unknown_status_count + 1;
                        }
                    }
                 }
            }
        } else {
            // This block will execute only once for 
            // for each team member
            dict_task_count[name] = 1;
            json_obj = {};
            json_obj['name'] = name;
            json_obj['sprint_name'] = sprint_name;
            json_obj['total_task_count'] = 1;
            json_obj['task_ready_for_test_count'] = 0;
            json_obj['inprogress_task_count'] = 0;
            json_obj['new_task_count'] = 0;
            json_obj['task_with_unknown_status_count'] = 0;
            json_obj['closed_task_count'] = 0;

            if (task_status === true) {
                json_obj['closed_task_count'] = 1;
            } else {
                if (task_status_name === "Ready for test") {
                    json_obj['task_ready_for_test_count'] = 1;
                } else if (task_status_name === "In progress") {
                    json_obj['inprogress_task_count'] = 1;
                } else if (task_status_name === "New") {
                    json_obj['new_task_count'] = 1;
                } else {
                    json_obj['task_with_unknown_status_count'] = 1
                }
            }
            big_obj.push(json_obj);
        }
    }
    return(big_obj);
}
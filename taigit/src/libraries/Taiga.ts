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

export async function sprint_list(projId : number) : Promise<Object> {
    return (await axios.get(`https://api.taiga.io/api/v1/milestones?project=${projId}`)).data;
  }
  
  export async function userstory_list(sprintId : number) : Promise<Object> {
    return (await axios.get(`https://api.taiga.io/api/v1/userstories?milestone=${sprintId}`)).data;
  }
  
  export async function task_list(userstoryId : number) : Promise<Object> {
    return (await axios.get(`https://api.taiga.io/api/v1/tasks?user_story=${userstoryId}`)).data;
  }
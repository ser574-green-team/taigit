import axios from "axios"

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
 * @returns object of project information
 * {
 *      id : number,          // Project id
 *      name : string,        // Project name
 *      created_date : number // Date project was created
 * }
 */
export async function
project_info(slug : string) : Promise<Object> {
    interface prj_info {
        id: number, 
        name: string, 
        created_date: Date, 
    }
    let data = await axios.get("https://api.taiga.io/api/v1/projects/by_slug?slug=" + slug)
    let info : prj_info = {id: data.data.id, name: data.data.name, 
                           created_date: data.data.created_date};
    return (info);
}

/**
 * @summary Get the stats of a project
 * @param projId the ID for project to get stats of
 * @returns project stats object
 * {
 *      assigned_pts : number,               // Number of assigned points
 *      assigned_pts_per_role : Object[],    // Distribution of assigned points across roles
 *      closed_pts : number,                 // Number of closed points
 *      closed_pts_per_role : Object[],      // Point distribution based on roles
 *      num_sprints : number,                // Number of sprints
 *      total_pts : number,                  // Total points in the project
 * }
 */
export async function
project_stats(projId : number) : Promise<Object> {
    let data = await axios.get("https://api.taiga.io/api/v1/projects/" + projId.toString() + '/stats');
    interface prj_stats {
        assigned_pts: number, 
        assigned_pts_per_role: Object[], 
        closed_pts: number, 
        closed_pts_per_role: Object[],
        num_sprints: number, 
        total_pts: number
    }
    let info : prj_stats = {assigned_pts: data.data.assigned_points, 
                            assigned_pts_per_role: data.data.assigned_points_per_role, 
                            closed_pts: data.data.closed_points, closed_pts_per_role: data.data.closed_points_per_role,
                            num_sprints: data.data.total_milestones, total_pts: data.data.total_points};
    return (info);
}

/**
 * @summary Get the stats for a sprint
 * @param sprintId the ID for the sprint to get stats for
 * @returns sprint stats object
 * {
 *      completed_pts : Object[],    // Distribution of completed points across roles
 *      total_pts : Object[],        // Total number of points
 *      completed_tsks : number,     // Number of completed tasks
 *      total_tsks : number,         // Total number of tasks
 *      completed_us : number,       // Number of completed user stories
 *      total_us : number,           // Total number of user stories
 *      sprint_start : string,       // Sprint start date as a string
 *      sprint_end : string,         // Sprint end date as a string
 *      burndown : Object[],         // Array object containing date(string), open_points(number), optimal_points(number)
 * }
 */
export async function
sprint_stats(sprintId : number) : Promise<Object> {
    let data = await axios.get("https://api.taiga.io/api/v1/milestones/"+sprintId.toString()+ '/stats');
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

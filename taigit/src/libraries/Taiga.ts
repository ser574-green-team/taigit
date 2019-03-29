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
 * @summary interface for sprint object
 * @param closed: boolean        //
 * @param closed_points: number  //
 * @param created_date: Date"    //
 * @param estimated_finish: Date //
 * @param estimated_start: Date  //
 * @param id: number             //
 * @param modified_date: Date    //
 * @param name: String           //
 * @param slug: String           //
 * @param total_points: number   //
 */

interface sprint_info {
    closed: boolean,
    closed_points: number,
    created_date: Date,
    estimated_finish: Date,
    estimated_start: Date,
    id: number,
    modified_date: Date,
    name: String,
    slug: String,
    total_points: number,
}

/**
 * @summary interface for userstory info
 * @param blocked_note: String   //
 * @param comment: String        //
 * @param created_date: Date     //
 * @param finish_date: Date      //
 * @param id: number             //
 * @param is_blocked: boolean    //
 * @param is_closed: boolean     //
 * @param milestone: number      //
 * @param milestone_name: String //
 * @param milestone_slug: String //
 * @param modified_date: Date    //
 * @param points: Object         //
 * @param ref: number            //
 * @param status: number         //
 * @param subject: String        //
 * @param total_comments: number //
 * @param total_points: number   //
 * @param version: number        //
 */
interface userstory_info {
    blocked_note: String,
    comment: String,
    created_date: Date,
    finish_date: Date,
    id: number,
    is_blocked: boolean,
    is_closed: boolean,
    milestone: number,
    milestone_name: String,
    milestone_slug: String,
    modified_date: Date,
    points: Object
    ref: number,
    status: number,
    subject: String,
    total_comments: number,
    total_points: number,
    version: number
}

/**
 * @summary interface for task info
 * @param assigned_to: number    //
 * @param blocked_note: String   //
 * @param created_date: Date     //
 * @param finished_date: Date    //
 * @param id: number             //
 * @param is_blocked: boolean    //
 * @param is_closed: boolean     //
 * @param is_iocaine: boolean    //
 * @param milestone: number      //
 * @param milestone_slug: String //
 * @param modified_date: Date    //
 * @param ref: number            //
 * @param status: number         //
 * @param subject: String        //
 * @param total_comments: number //
 * @param user_story: number     //
 * @param version: number        //
 */

interface task_info {
    assigned_to: number,
    blocked_note: String,
    created_date: Date,
    finished_date: Date,
    id: number,
    is_blocked: boolean,
    is_closed: boolean,
    is_iocaine: boolean,
    milestone: number,
    milestone_slug: String,
    modified_date: Date,
    ref: number,
    status: number,
    subject: String,
    total_comments: number,
    user_story: number,
    version: number,
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
 * @summary get list of sprints for a project
 * @param projId project id
 * @returns Object[]
 */
export async function sprint_list(projId : number) : Promise<Array<sprint_info>> {
    let data : sprint_info[] = (await axios.get(`https://api.taiga.io/api/v1/milestones?project=${projId}`)).data;
    return data;
}

/**
 * @summary get list of userstories for a sprint
 * @param sprintId sprint id
 * @returns Object[]
 */
export async function userstory_list(sprintId : number) : Promise<Object> {
    let data : userstory_info[] = (await axios.get(`https://api.taiga.io/api/v1/userstories?milestone=${sprintId}`)).data;

    return data;
}

/**
 * @summary get list of sprints for a project
 * @param userstoryId project id
 * @returns Object[]
 */
export async function task_list(userstoryId : number) : Promise<Object> {
    return (await axios.get(`https://api.taiga.io/api/v1/tasks?user_story=${userstoryId}`)).data;
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
 * @param project_id Taiga project Id
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
export async function
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
            json_obj['total_task_count'] = 0;
            json_obj['task_ready_for_test_count'] = 0;
            json_obj['inprogress_task_count'] = 0;
            json_obj['new_task_count'] = 0;
            json_obj['task_with_unknown_status_count'] = 0;
            json_obj['closed_task_count'] = 0;

            if (task_status === true) {
                json_obj['closed_task_count'] = 1;
                json_obj['total_task_count'] = 1;
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
                json_obj['total_task_count'] = 1;
            }
            big_obj.push(json_obj);
        }
    }
    return(big_obj);
}

/**
 * @summary Get the list of user's full name in a project
 * @param project_id Project id to get the data
 * @returns array of all the names in a project
 * [name1,name2,name3,...]
 */
export async function
get_user_list(project_id: string) : Promise<Object> {
    let response = (await axios.get(`https://api.taiga.io/api/v1/projects/${project_id}`)).data.members;
    let members_in_project: Array<Object> = [];
    for (let content of response) {
        members_in_project.push(content.full_name);
    }
    return(members_in_project);
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
 *    total_num_projects: number
 *    roles: string
 *    total_num_contacts: number
 *    total_num_closed_userstories: number
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
 * @summary This call return sprint velocity (unit points) based on sprint Id
 * @param sprintId the ID for the access of sprint stats
 * @returns
 * * {
 *          velocity : sprint velocity
 * }
 */
export async function
sprint_velocity_pts(sprintId : number) : Promise<Object> {
    let data = await axios.get("https://api.taiga.io/api/v1/milestones/"+sprintId.toString()+ '/stats');
    //test id:  https://api.taiga.io/api/v1/milestones/205316/stats
    //https://api.taiga.io/api/v1/milestones/219984/stats

     let entry = {
            pts : data.data.completed_points
        }
    let velocity : number = 0;
    for(let each of entry.pts ){
        velocity += each;
    }

    return velocity;
}

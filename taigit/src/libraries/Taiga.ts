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

//after auth, given slug of a project, will return sprint information.
export async function
taiga_sprint(slug: string) :  Promise<Object>{
    let url2 = "https://api.taiga.io/api/v1";
    let response = await axios.get(url2+"/projects/by_slug?slug="+slug) ;
    return (response);
}

//after auth, given id of a sprint, will return user story information.
export async function
taiga_userstory(sprintid: string) :  Promise<Object>{
    let url3="https://api.taiga.io/api/v1/milestones?project="
    let sprintRequest = await axios.get(url3+sprintid)
    return (sprintRequest);
}



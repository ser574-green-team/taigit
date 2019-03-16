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
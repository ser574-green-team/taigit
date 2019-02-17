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


export async function
taiga_sprint(slug: string) :  Promise<Object>{
    let url2 = "https://api.taiga.io/api/v1";
    let response = await axios.get(url2+"/projects/by_slug?slug="+slug) ;

    return (response);
}

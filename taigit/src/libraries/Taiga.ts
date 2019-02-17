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
import { DOMAIN } from "../constants/api.js";

function getAPI(id = '') {
    let promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'GET'
    })

    return promise
}
export default getAPI; 
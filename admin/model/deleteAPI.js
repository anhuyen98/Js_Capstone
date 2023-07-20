import { DOMAIN } from "../constants/api.js";

function deleteAPI(id) {
    let promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'DELETE'
    })

    return promise
}
export default deleteAPI; 
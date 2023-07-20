import { DOMAIN } from "../constants/api.js";

function putAPI(id, dataAPI) {
    let promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'PUT',
        data: dataAPI
    })

    return promise
}
export default putAPI; 
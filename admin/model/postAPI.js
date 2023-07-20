import { DOMAIN } from "../constants/api.js";

function postAPI(dataAPI) {
    let promise = axios({
        url: DOMAIN,
        method: 'POST',
        data: dataAPI
    })

    return promise
}
export default postAPI; 
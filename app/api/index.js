// import Api from './api';
//
// const api = new Api({
//   baseURI: '/api',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   }
// })
//
// export default api

import ApiClient from './ApiClient'
import AdminApi from './Admin';

export default function (apiPrefix) {
    console.log('apiPrefix is '+apiPrefix);
    // if (!apiPrefix) {
    //     throw new Error('[apiPrefix] required');
    // }

    const api = new ApiClient({prefix: apiPrefix});
    return {
        apiClient: api,
        admin: new AdminApi({apiClient:api})
    }
}
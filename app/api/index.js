/**
 * Created by nimdanoob on 2016/11/29.
 */
import Api from './api';
const api = new Api({
    baseURI:'/api/x-admin',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
})

export default api
/**
 * Created by nimdanoob on 2016/12/1.
 */
import Base from './Base'
export default class AdminAPI extends Base {
    login(username, password) {
        return this.apiclient.post('api/admin/login/', {'username': username, 'password': password})
    }
}
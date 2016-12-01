/**
 * Created by nimdanoob on 2016/12/1.
 */

export default class Base {
    constructor ({apiClient}){
        if (!apiClient) throw new Error('[apiClient] required')
        this.apiclient = apiClient;
    }
}
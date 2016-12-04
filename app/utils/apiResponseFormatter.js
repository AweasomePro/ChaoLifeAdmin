/**
 * Created by nimdanoob on 2016/12/1.
 */

export function formatAdminLogin(response) {
    if (response.code == '-100') {
        return {
            state: 'failed',
            message:response.message,
            user: null
        }
    } else return {
        state: 'success',
        user: response.result,
        message:response.message
    }
}
import fetch       from 'isomorphic-fetch';
import queryString from 'query-string';
import Promise     from 'bluebird';

export default class ApiClient {
    constructor({ prefix = '' } = {}) {
        this.prefix = prefix;
    }

    get(requestUrl, payload = {}, params = {}) {
        return this.request({
            url: requestUrl,
            method: 'get',
            body: payload,
            params
        });
    }

    put(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'put',
            body: payload
        });
    }

    patch(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'put',
            body: payload
        });
    }

    post(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'post',
            body: payload
        });
    }

    delete(requestUrl) {
        return this.request({
            url: requestUrl,
            method: 'delete'
        });
    }

    request({ url, method, params = {}, body }) {
        if (this.authToken) {
            /* eslint-disable */
            params.token = this.authToken;
            /* eslint-enable */
        }

        const urlWithQuery = `${url}?${queryString.stringify(params)}`;

        const init = {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-real-ip': this.XRealIP
            }
        };

        //todo support cookie
        init.credentials = 'include';
        console.log('start requesturl is'+`${this.prefix}/${urlWithQuery}`);
        if (method !== 'get' && method !== 'head') {
            console.log('body is '+init.body);
            init.body = JSON.stringify(body);
            console.log('and stringfy to '+init.body)
        }
        return fetch(`${this.prefix}/${urlWithQuery}`, init).then(res => {
            if (res.status >= 400) {
                throw new Error('Bad response from server');
            }
            console.log('res test is '+ res.text);

            return res.json();
        }).then(data => {
            if (data && data.code === 100) {
                return data;
            }
            return Promise.reject(data.message);
        });
    }

    setAuthToken(authToken) {
        this.authToken = authToken;
    }

    setXRealIP(XRealIP) {
        this.XRealIP = XRealIP;
    }
}
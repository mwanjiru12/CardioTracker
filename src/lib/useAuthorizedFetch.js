export default function useAuthorizedFetch() {

    return function(endpoint, method='GET', body=null) {
        return fetch(endpoint, {
            method: method,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: method === 'GET' ? body : JSON.stringify(body)
        }).then(method === 'GET' ? r => r.json() : null)
    }
}
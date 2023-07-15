export const login = (url, options = {}) => {
    return fetch(url, options).then((response) => response.json());
}

export const register = (url, options = {}) => {
    return fetch(url, options).then((response) => response.json());
}
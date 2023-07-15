export const listDispatches = (url, options = {}) => {
    return fetch(url, options).then((response) => response.json());
}

export const getDispatchById = (url, options = {}) => {
    return fetch(url, options).then((response) => response.json());
}
export const saveDispatch = (url, options = {}) => {
    return fetch(url, options).then((response) => response.json());
}
export const updateDispatch = (url, options = {}) => {
    return fetch(url, options).then((response) => response.json());
}
export const deleteDispatch = () => {}
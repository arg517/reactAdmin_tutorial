import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
// import Interceptor from './interceptor/interceptor';

// const apiUrl = "https://jsonplaceholder.typicode.com"
const apiUrl = "https://fakestoreapi.com"

// 
const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    options.headers.set('x-auth-token', localStorage.getItem('token'));
    return fetchUtils.fetchJson(url, options);
};

export default {
    getList: (resource, params) => {
        console.log("get list data provider ::", resource, params)
        console.log("resource ::", resource)
        console.log("params ::", params)

        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        console.log(order)

        const queryParams = {
            sort: order.toLowerCase(),
            //range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            limit: JSON.stringify(perPage),
            offset: JSON.stringify((page - 1) * perPage),
            // filter: JSON.stringify(params.filter),
        };

        const url = `${apiUrl}/${resource}?${stringify(queryParams)}`;
        // const url = `${apiUrl}/${resource}`;

        return httpClient(url).then(({ headers, json }) => {
            console.log("Get List ::", json);
            return ({
                data: json,
                total: json.length
            })
        })
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
            console.log("Get One ::", json)
            return ({
                data: json,
            })
        }),

    update: (resource, params) => {
        console.log("update params ::", params)
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            // headers: new Headers({ 'x-auth-token': localStorage.getItem('token') }),
        })
            .then(({ json }) => {
                console.log("update ::", resource, params.id)
                return ({ data: json })
            }).catch(error => console.log(error))
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data)
        }).then(({ json }) => {
            console.log("create user ::", params, json);
            console.log("create user response json ::", json);
            return ({
                data: { ...params.data, id: json.id },
            })
        }),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => {
            console.log("delete ::", resource, params.id)
            return ({ data: json })
        }
        )
};
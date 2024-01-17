interface RequestOptions {
    body?: string;
    headers?: {
        'content-type'?: string;
        'X-Authorization'?: string;
    };
}

const buildOptions = (data?: string): RequestOptions => {
    const options: RequestOptions = {};

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'content-type': 'application/json'
        };
    }

    const token = localStorage.getItem('accessToken');

    if (token) {
        options.headers = {
            ...options.headers,
            'X-Authorization': token
        };
    }

    return options;
};

const request = async (method: string, url: string, data?: string): Promise<string> => {
    const response = await fetch(url, {
        ...buildOptions(data),
        method,
    });

    // if (response.status === 204) {
    //     return {};
    // }

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');
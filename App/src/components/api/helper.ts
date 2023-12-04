


export const request = async (request: Promise<Response>) => {
    return await request
        .then((response) => response.json())
        .then((res: any) => {
            return res;
        }).catch((err) => console.error(err));
}

export const postOptions = (data?: any) => {
    const body = data ? JSON.stringify(data) : undefined;
    const request =  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    };

    return request;
}

export const deleteOptions = (data?: any) => {
    const body = data ? JSON.stringify(data) : undefined;

    const request =  {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body
    };

    return request;
}
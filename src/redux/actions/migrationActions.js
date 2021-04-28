import Client from '~/Client'

const client = new Client()

export const download = (fd) =>
    client.call({
        uri: `/migration/download`,
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        data: fd,
        // responseType: 'blob'
    })


export const sendFile = (fd) => dispatch => client.call({
    uri: `/migration/upload`,
    method: "POST",
    data: fd,
    headers: {
        "Content-type": "multipart/form-data",
    }
})


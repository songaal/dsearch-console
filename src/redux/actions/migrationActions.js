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
        responseType: 'blob'
    })
        .then(response => {
            let json = JSON.parse(sessionStorage.getItem('SET_DSEARCH_AUTH_USER'));
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(new Blob([response.data], {
                type: response.headers['content-type']
            }));
            link.setAttribute('download', `dsearch-${json.cluster.name}-backup.json`);
            document.body.appendChild(link);
            link.click();
        })


export const sendFile = (fd) => dispatch => client.call({
    uri: `/migration/upload`,
    method: "POST",
    data: fd,
    headers: {
        "Content-type": "multipart/form-data",
    }
})


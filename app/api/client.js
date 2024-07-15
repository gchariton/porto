import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'http://127.0.0.1:8081/api/',
});

apiClient.get('/listings').then((response) => {
    if (!response.ok) {
        response.problem;
    }
});

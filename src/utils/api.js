import axios from 'axios';

const financesApi = axios.create({
    baseURL: 'http://10.1.1.22:3000',
    timeout: 1000
})

export default financesApi;
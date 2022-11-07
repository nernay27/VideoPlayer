import axios from 'axios';
// base url to make requests to the movie database
const instance = axios.create({
    baseURL:"http://localhost:5000/api/ReactPlayerUserData"
})

export default instance;
import axios from 'axios';

const instance = axios.create({
    baseURL:' https://us-central1-clone-a04c2.cloudfunctions.net/api'
    //Cloud functions
});

export default instance;
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-d0513.firebaseio.com/'
});

export default instance;
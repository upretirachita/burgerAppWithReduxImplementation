import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burgerapp-20fa8.firebaseio.com/'
})

export default instance;
import axios from "axios";

//base url to make requests to the database
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})


export default instance;

//when using default export, you can import this object in another file without the need of destructuring it there
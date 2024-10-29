import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost/laravel8/laravel8/public/api"
})
export const productImage = "http://localhost/laravel8/laravel8/public/upload/product/"

export const blogUrlImage = "http://localhost/laravel8/laravel8/public/upload/blog/image/"
export const userUrlImage = "http://localhost/laravel8/laravel8/public/upload/user/avatar/"
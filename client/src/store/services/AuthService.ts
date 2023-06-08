import { AxiosResponse } from 'axios';
import axios from 'axios';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/auth/login', { email, password });
    }

    static async registration(email: string, password: string): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/auth/registration', { email, password });
    }

    static async validateEmail(token: string): Promise<AxiosResponse> {
        return axios.post('http://localhost:6125/validate/email', { token });
    }

    static async loginGoogle(): Promise<AxiosResponse> {
        return axios.get('http://localhost:6125/auth/google');
    }

    static async loginVK(): Promise<AxiosResponse> {
        return axios.get('http://localhost:6125/auth/vk');
    }

    static async logout(): Promise<void> {
        return axios.post('http://localhost:6125/auth/logout');
    }
}

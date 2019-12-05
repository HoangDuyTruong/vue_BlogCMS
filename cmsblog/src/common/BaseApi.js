import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import {API_URL} from "@/common/config.js";
import  JwtService  from "@/common/jwt.service.js";
const ApiService = {
    init() {
        Vue.use(VueAxios,axios);
        Vue.axios.defaults.baseURL = API_URL;
    },
    setHeader() {
        Vue.axios.defaults.headers.common[
            "Authorization"
          ] = `Token ${JwtService.getToken()}`;
    },
    get(resource, slug = "") {
        return Vue.axios.get(`${resource}/${slug}`).catch(error => {
          throw new Error(`[RWV] ApiService ${error}`);
        });
    },
    post(resource, params) {
        return Vue.axios.post(`${resource}`, params);
    },
    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params);
    },
    delete(resource) {
        return Vue.axios.delete(resource).catch(error => {
          throw new Error(`[RWV] ApiService ${error}`);
        });
    }
}
export default ApiService;
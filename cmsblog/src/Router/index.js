import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes:[
        {
            path: "/",
            component: () => import("@/components/HelloWorld"),
        },
        {
            path: "/writepost",
            component: () => import("@/components/WritePost"),
        },
        {
            path: "/skill",
            component: () => import("@/components/Skill/Skill")
        }, 
        {
            path: "/InforProfile",
            component: () => import("@/components/InfoProfile/InforProfile")
        },
        {
            path: "/WorkExp",
            component: () => import("@/components/WorkExp/WorkExp")
        }

    ]
})
import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
import axios from "axios";


Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.$axios = axios

const routes = [
    {
        //重定向初始页面
        path: '/',
        redirect:'login'
    },
    {
        path:'/login',
        component: () => import('@/components/Login')
    },
    {

        //path:路由地址 component：组件模板对象
        path: '/appindex',
        component: () =>import('@/components/AppIndex'),
        children: [
            {
                path: 'matlist',
                name: 'matlist',
                component: () =>import('@/components/material/MateriaList')
            },
            {
                path: 'deslist',
                name: 'deslist',
                component: () =>import('@/components/dessert/DessertsList')
            },
            {
                path: 'suplist',
                name: 'suplist',
                component: () =>import('@/components/supplier/SupplierList')
            },
            {
                path: 'userlist',
                name: 'userlist',
                component: () =>import('@/components/user/UserList')
            },
            {
                path: 'dessale',
                name: 'dessale',
                component: () =>import('@/components/dessert/DessertsSale')
            },
            {
                path: 'salelist',
                name: 'salelist',
                component: () =>import('@/components/dessert/SaleList')
            },
            {
                path: 'matform',
                name: 'matform',
                component: () =>import('@/components/material/MatForm')
            },
            {
                path: 'desform',
                name: 'desform',
                component: () =>import('@/components/dessert/DesForm')
            },
            {
                path: 'desmake',
                name: 'desmake',
                component: () =>import('@/components/dessert/DessertsMake')
            },
            {
                path: 'matuse',
                name: 'matuse',
                component: () =>import('@/components/material/MaterialUse')
            },
            {
                path: 'matbuy',
                name: 'matbuy',
                component: () =>import('@/components/material/MaterialBuy')
            }
        ]
    }

]
const router = new VueRouter({
    routes: routes,
    mode: 'history',
    linkActiveClass: 'active',
    base: process.env.BASE_URL
})

export default router
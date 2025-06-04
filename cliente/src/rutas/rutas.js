import { createRouter,createWebHistory } from "vue-router";
import inicio from '../componentesAdministrador/vistasAdministrador/inicioDelAdministrador.vue';
import tablaUsuarios from "@/componentesAdministrador/vistasAdministrador/tablaUsuarios.vue";
import TablaProductos from "@/componentesAdministrador/vistasAdministrador/tablaProductos.vue";
import TablaFianzas from "@/componentesAdministrador/vistasAdministrador/tablaFianzas.vue";
import ConfiguracionCuenta from "@/componentesAdministrador/vistasAdministrador/configuracionCuenta.vue";
import CerrarSesion from "@/componentesAdministrador/vistasAdministrador/cerrarSesion.vue";
import historialDeAcceso from "@/componentesAdministrador/vistasAdministrador/historialDeAcceso.vue";
import TablaClientes from "@/componentesAdministrador/vistasAdministrador/tablaClientes.vue";
import TablaVentas from "@/componentesAdministrador/vistasAdministrador/tablaVentasPorUsuario.vue";
import Login from "@/navegadorPrincipal/login.vue";
import Registro from "@/components/Registro.vue";
import TablaCompras from "@/componentesUsuario/vistasCliente/tablaCompras.vue";
import Configuracion2 from "@/componentesUsuario/configuracion.vue";

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path:'/',
        component: inicio,
        meta: { requiresAuth: true }
    },
    {
        path:'/tablaUsuarios',
        component: tablaUsuarios,
        meta: { requiresAuth: true }
    },
    {
        path:'/tablaProductos',
        component: TablaProductos,
        meta: { requiresAuth: true }
    },
    {
        path:'/tablaFianzas',
        component: TablaFianzas,
        meta: { requiresAuth: true }
    },
    {
        path:'/configuracionCuenta',
        component: ConfiguracionCuenta,
        meta: { requiresAuth: true }
    },
    {
        path:'/cerrarSesion',
        component: CerrarSesion,
        meta: { requiresAuth: true }
    },
    {
        path:'/historial',
        component: historialDeAcceso,
        meta: { requiresAuth: true }
    },
    {
        path:'/tablaClientes',
        component: TablaClientes,
        meta: { requiresAuth: true }
    },
    {
        path:'/tablaVentas/:id',
        name:'tablaVentas',
        component: TablaVentas,
        meta: { requiresAuth: true }
    },
    {
        path:'/registro',
        component:Registro,

    },
    {
        path:'/cliente',
        name:'cliente',
        component:TablaCompras,
        meta: { requiresAuth: true }
    },
    {
        path:'/configuracion',
        name:'configuracion',
        component:Configuracion2,
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Guardia de navegación
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token') // Aquí deberías verificar si el usuario está autenticado
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next('/login')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;
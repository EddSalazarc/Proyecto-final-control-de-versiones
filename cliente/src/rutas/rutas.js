import { createRouter,createWebHistory } from "vue-router";
import inicio from '../componentesAdministrador/vistasAdministrador/inicioDelAdministrador.vue';
import tablaUsuarios from "@/componentesAdministrador/vistasAdministrador/tablaUsuarios.vue";
import TablaProductos from "@/componentesAdministrador/vistasAdministrador/tablaProductos.vue";
import TablaFianzas from "@/componentesAdministrador/vistasAdministrador/tablaFianzas.vue";
import ConfiguracionCuenta from "@/componentesAdministrador/vistasAdministrador/configuracionCuenta.vue";
import CerrarSesion from "@/componentesAdministrador/vistasAdministrador/cerrarSesion.vue";
import historialDeAcceso from "@/componentesAdministrador/vistasAdministrador/historialDeAcceso.vue";
const routes = [
    {
        path:'/',component:inicio,
    },
    {
        path:'/tablaUsuarios',component:tablaUsuarios,
    },
    {
        path:'/tablaProductos',component:TablaProductos,
    },
    {
        path:'/tablaFianzas',component:TablaFianzas,
    },
    {
        path:'/configuracionCuenta',component:ConfiguracionCuenta,
    },
    {
        path:'/cerrarSesion',component:CerrarSesion,
    },
    {
        path:'/historial',component:historialDeAcceso,
    }
]

const router = createRouter ({
    history:createWebHistory(),
    routes
})
export default router;
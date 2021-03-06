//const IP: string = "https://addsoft-tech.com:"
const IP: string = "http://35.243.246.83:"
const PUERTO: string = "8780"
//const PUERTO: string = "8443"

//const URL: string = IP + PUERTO;

const URL: string = "http://localhost:3000"; 
//const URL: string = "https://app-backend-school.herokuapp.com"

export const environment = {
    production: false,
    email: 'lukassant77@gmail.com',
    url: 'https://addsoft-tech.com:8443/rmi/',
    loginschool: URL + '/app/v1/user/login',
    login: URL + '/coob/wsapi/auth/login',
    unidades: URL + '/coob/wsapi/adm/units',
    addunidad: URL + '/coob/wsapi/adm/unit/create',
    updateunidad: URL + '/coob/wsapi/adm/unit/update',
    cargos: URL + '/coob/wsapi/adm/cargos',
    addcargo: URL + '/coob/wsapi/adm/cargo/create',
    updatecargo: URL + '/coob/wsapi/adm/cargo/update',
    obras: URL + '/coob/wsapi/liob/obras',
    addobra: URL + '/coob/wsapi/liob/obra/create',
    updateobra: URL + '/coob/wsapi/liob/obra/update',
    users: URL + '/app/v1/user/all',
    adduser: URL + '/app/v1/user/add',
    updateuser: URL + '/app/v1/user/update',
    addobrabyuser: URL + '/coob/wsapi/auth/usuaobra/create',
    removeobrabyuser: URL + '/coob/wsapi/auth/usuaobra/delete/',
    schedule: URL + '/app/v1/schedule/get/schedule',
    courses: URL + '/app/v1/course/all',









    client: URL + '/romi/apirm/crm/clients',
    addclient: URL + '/romi/apirm/crm/client/add',
    updateclient: URL + '/romi/apirm/crm/client/update',
    //users: URL + '/romi/apirm/user/all',
    //adduser: URL + '/romi/apirm/user/add',
    //updateuser: URL + '/romi/apirm/user/update',
    resetpassword: URL + '/romi/apirm/user/reset/pass/',
    roles: URL + '/romi/apirm/user/roles/all',
    rolesbyuser: URL + '/romi/apirm/user/usro/add',
    removeroles: URL + '/romi/apirm/user/usro/remove',
    flowers: URL + '/romi/apirm/crm/flowers',
    addflowers: URL + '/romi/apirm/crm/flower/add',
    updateflowers: URL + '/romi/apirm/crm/flower/update',
    searchflower: URL + '/romi/apirm/crm/flower/',
    addresourcesflower: URL + '/romi/apirm/crm/flower/resource/add',
    removeresourcesflower: URL + '/romi/apirm/crm/flower/resource/remove/',
    finca: URL + '/romi/apirm/crm/farms',
    addfinca: URL + '/romi/apirm/crm/farm/add',
    updatefinca: URL + '/romi/apirm/crm/farm/update',
    empresaCargo: URL + '/romi/apirm/crm/cargocompanies',
    addempresaCargo: URL + '/romi/apirm/crm/cargocompany/add',
    updateempresaCargo: URL + '/romi/apirm/crm/cargocompany/update',
    marcaciones: URL + '/romi/apirm/crm/marks/',
    addmarcaciones: URL + '/romi/apirm/crm/mark/add',
    updatemarcaciones: URL + '/romi/apirm/crm/mark/update',
    registerinvoice: URL + '/romi/apirm/invoice/register',
    registerinvoicedraft: URL + '/romi/apirm/invoice/registertmp',
    searchtype: URL + '/romi/apirm/crm/entity/',
    searchtypeComplete: URL + '/romi/apirm/crm/entity/complete/',
    registerpaymentandclaim: URL + '/romi/apirm/trx/register',
    registerprealert: URL + '/romi/apirm/prealert/register',
    getsales: URL + '/romi/apirm/invoice/find/date/',
    getinvoicesbyclient: URL + '/romi/apirm/trx/find/cliedate/',
    getmarcsbyname: URL + '/romi/apirm/crm/mark/find/',
    getprealertactive: URL + '/romi/apirm/prealert/actives',
    getprealertactivebyClient: URL + '/romi/apirm/crm/prealert/active/client/',
    sendEmail: URL + '/romi/apirm/crm/mail/send/trx',
    invoicesdrafts: URL + '/romi/apirm/invoice/drafts',
    prealertdrafts: URL + '/romi/apirm/prealert/drafts',
    viewdraft: URL + '/romi/apirm/invoice/draft/excel',
    charts: URL + '/romi/apirm/crm/data/charts',
    chartsbyclient: URL + '/romi/apirm/crm/data/charts/client/',
    getbalancegenral: URL + '/romi/apirm/trx/find/cliedate/report/',
    getstatusprealert: URL + '/romi/apirm/prealert/state/all',
    addstatusprealert: URL + '/romi/apirm/prealert/state/new',
    updatestatusprealert: URL + '/romi/apirm/prealert/state/update',
    deletestatusprealert: URL + '/romi/apirm/prealert/state/del',
    getXlsPrealert: URL + '/romi/apirm/prealert/generate/xls',
    templates: URL + '/romi/apirm/template/list/all',
    addtemplateshead: URL + '/romi/apirm/template/new',
    addtemplatesdetaill: URL + '/romi/apirm/template/detail/new',
    deletetemplate: URL + '/romi/apirm/template/delete/',
    deletetemplatedetalle: URL + '/romi/apirm/template/delete/detail/',
    updatetemplatedetalle: URL + '/romi/apirm/template/detail/update',
    pedidos: URL + '/romi/apirm/order/list/pendings',
    pedidobyclient: URL + '/romi/apirm/orders/',
    pedidoregister: URL + '/romi/apirm/order/register',
    notificationprealert: URL + '/romi/apirm/order/notification',
    updatedatesorder: URL + '/romi/apirm/order/update/dates',
    historicordersbyclient: URL + '/romi/apirm/orders/',
    historicordersall: URL + '/romi/apirm/orders/finished',
};

const IP: string = "https://addsoft-tech.com:"
const PUERTO: string = "8443"

const URL: string = IP + PUERTO;

export const environment = {
    production: false,
    login: URL + '/romi/api/user/login',
    client: URL + '/romi/api/crm/clients',
    addclient: URL + '/romi/api/crm/client/add',
    updateclient: URL + '/romi/api/crm/client/update',
    users: URL + '/romi/api/user/all',
    adduser: URL + '/romi/api/user/add',
    updateuser: URL + '/romi/api/user/update',
    resetpassword: URL + '/romi/api/user/reset/pass/',
    roles: URL +'/romi/api/user/roles/all',
    rolesbyuser: URL + '/romi/api/user/usro/add',
    removeroles: URL +'/romi/api/user/usro/remove',
    flowers: URL + '/romi/api/crm/flowers',
    addflowers: URL + '/romi/api/crm/flower/add',
    updateflowers: URL + '/romi/api/crm/flower/update',
    finca: URL + '/romi/api/crm/farms',
    addfinca: URL + '/romi/api/crm/farm/add',
    updatefinca: URL + '/romi/api/crm/farm/update',
    empresaCargo: URL + '/romi/api/crm/cargocompanies',
    addempresaCargo: URL + '/romi/api/crm/cargocompany/add',
    updateempresaCargo: URL + '/romi/api/crm/cargocompany/update',
    marcaciones: URL + '/romi/api/crm/marks/',
    addmarcaciones: URL + '/romi/api/crm/mark/add',
    updatemarcaciones: URL + '/romi/api/crm/mark/update',


};

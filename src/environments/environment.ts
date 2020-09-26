const IP: string = "https://addsoft-tech.com:"
const PUERTO: string = "8443"

const URL: string = IP + PUERTO;

export const environment = {
    production: false,
    login: URL + '/romi/api/user/login',
    client: URL + '/romi/api/crm/clients',
    addclient: URL + '/romi/api/crm/client/add',
    updateclient: URL + '/romi/api/crm/client/update',
    adduser: URL + '/romi/api/user/add',
    updateuser: URL + '/romi/api/user/update',
    resetpassword: URL + '/romi/api/user/reset/pass/'
};

const IP: string = "https://addsoft-tech.com:"
const PUERTO: string = "8443"

const URL: string = IP + PUERTO;

export const environment = {
    production: false,
    login: URL + '/romi/api/user/login',
    client: URL + '/romi/api/crm/clients'
};

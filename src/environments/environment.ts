const hostName = window.location.hostname;
const Server = "10.100.204.2";
export const environment = {

    production: true,
    API_AUTH: 'http://' + hostName + ':5061/api/auth/',
    API_Parametrage: 'http://' + hostName + ':5061/api/parametrage/',
    API_DASHBORD: 'http://' + hostName + ':5061/api/dashbord/',
    API_RECEPTION: 'http://' + hostName + ':5061/api/reception/',
    API_SOC: 'http://' + hostName + ':5061/api/soc',
    API_PHARMACIE: 'http://' + hostName + ':5061/api/pharmacie/',
    API_DOCTOR: 'http://' + hostName + ':5061/api/doctor/',
    API_CHECKSUM: 'http://' + hostName + ':5061/api/checksum/',
    
    API_EXMANE: "/examen/",
    
    API_DMI: "/dmi/",
    adressIP: Server,

};



 let API_URLs={
    CORE : {
        LOGIN : '/api/auth/signin',
        REGISTERATION : '/api/auth/signup'
        
    },
    NAVBAR: {
        DEFAULT: '/header/default',
        DASHBOARD: '/header/dashboard',
        ALL: 'all',

    },
    USER: {
        USER: '/user',
    },
    ADMIN: {
        ADMIN: '/admin'
    },
    SUPER_ADMIN: {
        SUPER_ADMIN: '/superadmin'
    },
    API_FILE: {
        FILE_API : '/api-file/files/',
        
    },
    API_USER: {
       
        USER_LIST: '/api-user/userList',
        USER_CREATE: '/api-user/createUser',
        USER_PROFILE: '/api-user/userProfile',
        USER_LIST_BY_ROLE: '/api-user/userListByRole'
    },
    API_DATA: {
        VILLAGE_LIST: '/api-data/villageList',
        ALLDATA_FILTER:'/api-data/dataList',
         ALLDATAS_FILTER:'/api-data/dataLists'
    },
    API_CSV: {
         FILE_API : '/api-csv/download', 
    }

    
    }

    
export default API_URLs;


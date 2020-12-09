const env = process.env.SERVER_ENV || 'development';

const config = {
    development: {
        env: 'development',
        writeXmlRequestResponse: true,
        redis: {
            host: '127.0.0.1',
            port: '6379',
            password: ''
        },
        client: {
            port: 4200,
            hostname: 'localhost',
            secure: false
        },
        server: {
            port: 8000,
            hostname: 'localhost',
        },
        database: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'recipe',
            port: 3306
        },
        api: {
            pwdHashSalt: '20fe7a4be6f6a805e1ad5e15a5e9e23285c679f1',
            tokenExpiry: 86400,
            refreshTokenExpiry: 86400,
            apiSecretKey:'thisismyapiseceretkeyforjwttoken',
            apiSecretKeyRefreshToken:'thisismyapiseceretkeyforjwtrefreshtoken'
        },
        awsS3: {
            accessKeyId: 'AKIAJRVNRA2KDJ5SIAAA',
            secretAccessKey: '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',
            region: 'us-east-1',
            bucket: 'tpconnects-localproperty',
            // orgName: "TPConnects",
            ACL: 'public-read',
            BASE_PATH_AWS: 'http://tpconnects-localproperty.s3.amazonaws.com',
        },
        aws:{
            s3:{
                    accessKeyId: 'AKIAJRVNRA2KDJ5SIAAA',
                    secretAccessKey: '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',
                bucket: 'tpconnects-localproperty',
                        }
        }
    },
    stagging: { 
            env: 'development',
            writeXmlRequestResponse: true,
            redis: {
                host: '127.0.0.1',
                port: '6379',
                password: ''
            },
            client: {
                port: 4200,
                hostname: 'localhost',
                secure: false
            },
            server: {
                port: 8000,
                hostname: 'localhost',
            },
            database: {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'recipe',
                port: 3306
            },
            api: {
                pwdHashSalt: '20fe7a4be6f6a805e1ad5e15a5e9e23285c679f1',
                tokenExpiry: 86400,
                refreshTokenExpiry: 86400,
                apiSecretKey:'thisismyapiseceretkeyforjwttoken',
                apiSecretKeyRefreshToken:'thisismyapiseceretkeyforjwtrefreshtoken'
            },
            awsS3: {
                accessKeyId: 'AKIAJRVNRA2KDJ5SIAAA',
                secretAccessKey: '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',
                region: 'us-east-1',
                bucket: 'tpconnects-localproperty',
                // orgName: "TPConnects",
                ACL: 'public-read',
                BASE_PATH_AWS: 'http://tpconnects-localproperty.s3.amazonaws.com',
            },
            aws:{
                s3:{
                        accessKeyId: 'AKIAJRVNRA2KDJ5SIAAA',
                        secretAccessKey: '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',
                    bucket: 'tpconnects-localproperty',
                            }
            }
    },
    production: {
        env: 'production',
        writeXmlRequestResponse: true,
        client: {
            port: process.env.PORT || 3200,
            hostname: process.env.HOSTNAME || 'localhost',
            secure: true
        },
        server: {
            port: process.env.PORT || 3200,
            hostname: process.env.HOSTNAME || 'localhost',
        },
        redis: {
            host: 'redis-agg-uat.walfn3.0001.use1.cache.amazonaws.com',
            port: '6379',
            password: ''
        },
        database: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            dialect: process.env.DB_DIALECT,
        },
        
    }
};

config[env].isDev = env === 'development';
config[env].isTest = env === 'stagging';
config[env].isProd = env === 'production';
module.exports = config[env];

import { createClient } from 'redis';

 const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASS ,
    socket: {
        host: 'redis-19354.c91.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 19354
    }
});

client.on('error', err => console.log('Redis Client Error', err));


export default client ;


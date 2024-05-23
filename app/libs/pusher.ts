import PusherServer from 'pusher'
import PusherCient from 'pusher-js'

// config pusher for server node js
export const pusherServer = new PusherServer({
    appId:process.env.PUSHER_APP_ID!,
    key:process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret:process.env.PUSHER_APP_SECRET!,
    cluster:'ap2',
    useTLS:true
})


// config pusher for client react js
export const pusherCient = new PusherCient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,{ 
    cluster:"ap2"
})
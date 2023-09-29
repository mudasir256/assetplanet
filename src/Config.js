const dev = {
    api_server: 'https://cors-anywhere.herokuapp.com/http://34.220.170.60/graphql',
    backend_server: 'http://localhost:3101'
}

const prod = {
    api_server: 'https://cors-anywhere.herokuapp.com/http://34.220.170.60/graphql',
    backend_server: 'http://3.16.203.113:3101'
}

const config = process.env.NODE_ENV == 'production' ? prod : dev
// const config = prod;
// const config = dev;
export default config
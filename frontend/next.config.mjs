export default {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'http://localhost:3001/:path*' // Express backend
      },
      {
        source: '/api/agent/:path*',
        destination: 'http://localhost:3000/:path*' // Agent server
      },
      
    ];
  },
};

export default {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: process.env.API_PROXY_URL || "http://localhost:3001/:path*",
        },
      ];
    },
  };
  
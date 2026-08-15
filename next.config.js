/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["iyzipay"],
    outputFileTracingIncludes: {
      "/api/iyzico/checkout/**": ["./node_modules/iyzipay/lib/resources/**"],
      "/api/iyzico/callback/**": ["./node_modules/iyzipay/lib/resources/**"],
    },
  },
};

module.exports = nextConfig;

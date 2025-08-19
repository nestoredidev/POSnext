import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: process.env.DOMAIN!,
            },
            {
                protocol: 'https',
                hostname: process.env.CLAUDINARY!,
            }
        ]
    }
};

export default nextConfig;

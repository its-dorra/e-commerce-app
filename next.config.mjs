// import MillionLint from "@million/lint";
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

// export default MillionLint.next({ rsc: true })(nextConfig);

export default nextConfig;

import type {NextConfig} from 'next';

// GitHub Pages project site: https://craftlayer-studio.github.io/industry-demos/
export const BASE_PATH = '/industry-demos';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: BASE_PATH,
  trailingSlash: true,
  images: {unoptimized: true},
  env: {NEXT_PUBLIC_BASE_PATH: BASE_PATH},
};

export default nextConfig;

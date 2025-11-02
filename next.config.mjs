/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // App directory is stable in Next.js 13.4+
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Enable strict mode
  reactStrictMode: true,
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Add Three.js support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    })
    
    return config
  },
}

export default nextConfig
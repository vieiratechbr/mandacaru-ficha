/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'html2pdf.js': false,
    }
    return config
  },
}
module.exports = nextConfig

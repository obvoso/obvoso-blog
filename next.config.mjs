import withPlaiceholder from "@plaiceholder/next"

/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development"
const devHttp = isDev ? " http:" : ""
const devWs = isDev ? " ws://localhost:3000" : ""

const cspHeader = `
  default-src 'self' https:${devHttp};
  connect-src 'self' https:${devHttp}${devWs};
  img-src 'self' https://*.s3.amazonaws.com https://obvoso.site/_next/image data: blob: https:${devHttp};
  font-src 'self' data: https:${devHttp};
  style-src 'self' 'unsafe-inline' https:${devHttp};
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
`
  .replace(/\n/g, "")
  .trim()

const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devtool = "inline-source-map"
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
        port: "",
        pathname: `/${process.env.AWS_IMAGE_ENDPOINT}/**`,
      },
      {
        protocol: "https",
        hostname: `prod-files-secure.s3.us-west-2.amazonaws.com`,
        port: "",
        pathname: `/**`,
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
        ],
      },
    ]
  },
}

export default withPlaiceholder(nextConfig)

import withPlaiceholder from "@plaiceholder/next"

/** @type {import('next').NextConfig} */

const nextConfig = {
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
    unoptimized: true,
  },
}

export default withPlaiceholder(nextConfig)

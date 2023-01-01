// import withImages from "next-images";
// export default withImages({
//     experimental: {
//         outputStandalone: true,
//     },
//     eslint: {
//         // Warning: This allows production builds to successfully complete even if
//         // your project has ESLint errors.
//         ignoreDuringBuilds: true,
//     },
// });

module.exports = {
    api: {
        bodyParser: {
            sizeLimit: "500kb",
        },
    },
    reactStrictMode: true,
    publicRuntimeConfig: {
        publicApiKey: process.env.publicApiKey || "",
        authDomain: process.env.FIREBASE_AUTH_HOST || "",
        projectId: process.env.projectId || "",
        mainDomain: process.env.MAIN_DOMAIN || "",
    },
};

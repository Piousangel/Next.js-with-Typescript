module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        apiKey: process.env.publicApiKey || "",
        authDomain: process.env.FIREBASE_AUTH_HOST || "",
        projectId: process.env.projectId || "",
    },

    // webpack: (config, { isServer }) => {
    //     // Fixes npm packages that depend on `fs` module
    //     if (!isServer) {
    //         config.node = {
    //             fs: "empty",
    //         };
    //     }
    // },
};

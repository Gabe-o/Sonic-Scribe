exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html" || stage === "develop-html") {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /@magenta/,
                        use: loaders.null(),
                    },
                    {
                        test: /canvas/,
                        use: loaders.null(),
                    },
                ],
            },
        });
    }
};

// tslint:disable:no-object-literal-type-assertion
import * as path from "path";
import { Configuration } from "webpack";
import * as nodeExternals from "webpack-node-externals";


module.exports = {
    entry: "./src/index.ts",

    output: {
        path: path.resolve("build"),
        filename: "index.js",
        libraryTarget: "umd",
        library: "docx",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        modules: [path.resolve("./src"), "node_modules"],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ["awesome-typescript-loader"],
            },
            // For coverage testing
            ...(process.env.NODE_ENV !== "production"
                ? [
                      {
                          test: /\.(ts)/,
                          include: path.resolve("src"),
                          loader: "istanbul-instrumenter-loader",
                          enforce: "post",
                          exclude: [/node_modules/],
                      },
                  ]
                : []),
        ],
    },

    target: 'node',
    node: false,
    externals: [nodeExternals()],
} as Configuration;

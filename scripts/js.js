const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const srcJs = path.resolve(process.cwd(), 'src', 'js');

const babelSettings = JSON.parse(fs.readFileSync('.babelrc'));

const config = {
    context: srcJs,
    entry: {},
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: babelSettings,
            },
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(process.cwd(), 'dist', 'js'),
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
    ]
};

fs.readdirSync('src/js')
    .map((file) => {
        if (file.endsWith('.js')) {
            const name = file.slice(0, -3);
            config.entry[name] = `./${name}`;
        }
    });

const compiler = webpack(config);

function handler(err, stats) {
    if (err) throw err;
    console.log(stats.toString({
        chunks: false,
        colors: true,
    }));
}

if (process.argv.slice(2).indexOf('--watch') > -1) {
    compiler.watch({
        aggregateTimeout: 300,
        poll: false
    }, handler);
} else {
    compiler.run(handler);
}

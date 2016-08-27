const fs = require('fs');
const exec = require('child_process').exec;

fs.readdir('src/js', function(err, files) {
    files.map((file) => {
        if (file.endsWith('.js')) {
            createBundle(file);
        }
    });
});

function createBundle(file) {
    const cmd = `webpack src/js/${file} dist/js/${file} --module-bind 'js=babel' --color --progress -p`;
    exec(cmd, function (err, stdout, stderr) {
        if (err) {
            console.error(`error when creating bundle: ${err}`);
            return;
        }
        console.log(cmd);
        console.log(stdout);
        console.log(stderr);
    });
}

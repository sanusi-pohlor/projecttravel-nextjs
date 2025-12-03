const fs = require('fs');
try {
    fs.copyFileSync('node_modules/@react-map/thailand/README.md', 'temp_readme.md');
    console.log('Copied README');
} catch (e) {
    console.error(e);
}

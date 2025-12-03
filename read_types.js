const fs = require('fs');
try {
    const content = fs.readFileSync('node_modules/@react-map/thailand/dist/index.d.ts', 'utf8');
    console.log(content);
} catch (e) {
    console.error(e);
}

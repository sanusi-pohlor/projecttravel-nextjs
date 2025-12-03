const fs = require('fs');
try {
    const content = fs.readFileSync('node_modules/@react-map/thailand/dist/index.d.ts', 'utf8');
    fs.writeFileSync('types_dump.txt', content);
} catch (e) {
    fs.writeFileSync('types_dump.txt', 'Error: ' + e.message);
}

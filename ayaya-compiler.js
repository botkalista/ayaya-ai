const fs = require("fs");
const path = require("path");
const files = [];

const getFilesRecursively = (directory) => {
    const filesInDirectory = fs.readdirSync(directory);
    for (const file of filesInDirectory) {
        const absolute = path.join(directory, file);
        if (fs.statSync(absolute).isDirectory()) {
            getFilesRecursively(absolute);
        } else {
            files.push(absolute);
        }
    }
};

getFilesRecursively('./dist');

files.forEach(e => {
    const text = fs.readFileSync(e, 'utf8');
    const imports = Array.from(text.matchAll(/(import .*? from ")(.*?)(";)/g));
    
    let newText = text;
    
    for (let i = 0; i < imports.length; i++) {
        if (imports[i][2].includes('.js')) continue;
        newText = newText.replace(imports[i][0], `${imports[i][1]}${imports[i][2]}.js${imports[i][3]}`);
    }

    fs.writeFileSync(e, newText);

});
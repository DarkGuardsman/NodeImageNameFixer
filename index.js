#!/usr/bin/env node

const fs = require('fs');

// Get provided args
const [, , ...args] = process.argv;

const folder = args[0];

//Log arguments used
console.log('Target Folder:', folder);

const regex = /\d{4}-\d{2}-\d{2}\s{1}\d{2}.\d{2}.\d{2}.jpg/g;

//Read all files in folder
fs.readdir(folder, function (err, files) {

    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    //Keep track of file index/count
    let fileCount = 0;

    //Loop through files found
    files.forEach(function (file) {

        //Match files we want only
        if (file.match(regex)) {
            //Log current file
            console.log(`Renaming:${fileCount}`, file);
            fileCount += 1;

            //Fix the file name
            const newName = file.replace(/-/g, "_").replace(/\s/g, '_');

            //Rename the file
            fs.rename(folder + "/" + file, folder + "/" + newName, function (err) {
                if (err) {
                    throw err;
                }
                console.log(`Renamed`, file, 'to', newName);
            });
        }
    });

});
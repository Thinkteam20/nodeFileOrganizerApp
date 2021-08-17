const os = require("os");
const fs = require("fs");
const path = require("path");

//access the right file name
const folder = process.argv[2];
if (!folder) {
  console.error("Please enter folder name in Pictures");
}
const workingDir = path.join(path.dirname(__filename), folder);

// create the 3 different directories
fs.promises.mkdir(`${workingDir}/video`).catch(console.error);
fs.promises.mkdir(`${workingDir}/captured`).catch(console.error);
fs.promises.mkdir(`${workingDir}/duplicated`).catch(console.error);

// assign
const unfiltered = fs.promises
  .readdir(workingDir)
  .then((data) => {
    data.filter(sepFile);
    // console.log(typeof data);
  })
  .catch(console.error);

function sepFile(name) {
  const extName = path.extname(name);

  if (extName === ".mp4" || extName === ".mov") {
    // console.log(name);
    // console.log(`${workingDir}/${name}`);
    // console.log(workingDir);

    const currentPath = `${workingDir}/${name}`;
    // console.log(currentPath);
    const newPath = path.join(`${workingDir}/video/${name}`);
    // console.log(newPath);
    try {
      fs.renameSync(currentPath, newPath);
      console.log("video has been moved!");
    } catch (error) {
      console.error;
    }
  } else if (extName === ".png" || extName === ".aae") {
    const currentPath = `${workingDir}/${name}`;
    const newPath = path.join(`${workingDir}/captured/${name}`);
    try {
      fs.renameSync(currentPath, newPath);
      console.log("captured image has been moved!");
    } catch (error) {
      console.error;
    }
  } else if (!name.includes("E") && extName === ".jpg") {
    const currentPath = `${workingDir}/${name}`;
    const newPath = path.join(`${workingDir}/duplicated/${name}`);
    try {
      fs.renameSync(currentPath, newPath);
      console.log("duplicated image has been moved!");
    } catch (error) {
      console.error;
    }
  }
  // console.log(path.extname(name));
}

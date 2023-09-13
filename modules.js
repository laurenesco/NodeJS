const sayHello = require("./hello.js");
const os = require('os');
const path = require('path');
const fs = require('fs');

// __dirname Global Variable
console.log(__dirname);
// __filename Global Variable
console.log(__filename);

// Operating system module
const systemUptime = os.uptime();	// Returns uptime in seconds
const userInfo = os.userInfo();		// Returns user ID, group ID, username, home directory, default shell
const otherOSInfo = {
	name: os.type(),						// Returns name of operating system
	release: os.release(),				// Returns release version of OS
	totalMem: os.totalmem(),			// Returns total memory avaialable in bytes
	freeMem: os.freemem()				// Returns total free memory available in bytes
}

// Path module functions
const myPath = 'C:/Users/laesc/OneDrive/Desktop/repos/NodeJS/app.js';
const pathInfo = {
	fileName: path.basename(myPath),
	folderName: path.dirname(myPath),
	fileExtension: path.extname(myPath),
	absoluteOrNot: path.isAbsolute(myPath),
	detailInfo: path.parse(myPath),
	resolvePath: path.resolve('grandParentFolder', 'parentFolder', 'child.txt')
}

// FS module functions
fs.mkdir('./fsTest', (err) => {		// Asynchronous. Two parameters, name of directory to be created, and optional callback
	if (err) {								// The callback function executes after directory creation, with error info (if any)
		console.log(err);
	} else {
		console.log('Folder created');
	}
})
// Asynchronous read/write
fs.writeFile('./fsTest/file.txt', "Testing...\n", {flag: 'a'},  (err) => {		// Asynchronous. parameters:
	if (err) {																						// Path of file to write to, data to write,
      console.log(err);																			// flag to append if file exists, optnl callback
   } else {
      console.log('File created and written');
   }
})
fs.readFile('./fsTest/file.txt', {encoding: 'utf-8'}, (err, data) => {			// Asynchronous. parameters:
	if(err) {																						// path of file to read,
		console.log(err);																			// encoding flag, callbacks
	} else if (data) {
		console.log('File read: ');
		console.log(data);
	}
})
// Synchronous read/write
try {
	fs.writeFileSync('./fsTest/file.txt', 'Synchronous write: ', {flag: 'a'});
	console.log('Synchronous write successful');

   console.log(fs.readFileSync('./fsTest/file.txt', 'utf-8'));
	console.log('Synchronous read successful');
} catch (err) {
		console.log('Error while synchronous read/write');
		console.log(err);
}
fs.readdir('./fsTest', (err, files) => {
	if (err) {
		console.log(err);
	} else if (files) {
		console.log('Directory read succesful: ');
		console.log(files);
	}
})
fs.rename('./fsTest/file.txt', './fsTest/testfile.txt', (err) => {
	if (err) {
		console.log(err);
	}	else {
		console.log('Renaming succesful');
	}
})
fs.unlink('./file.txt', (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("File deleted");
	}
})

sayHello("Serena");
console.log(systemUptime);
console.log(userInfo);
console.log(otherOSInfo);
console.log(pathInfo);

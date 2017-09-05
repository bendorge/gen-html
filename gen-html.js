// Better documented code to come

var fs = require("fs");
var path = require("path");

var layoutsDir = __dirname + '\\layouts';
var pagesDir = __dirname + '\\pages';
var snippetDir = __dirname + '\\snippets';
var buildDir = __dirname + '\\build';

var site_variables_json = fs.readFileSync("site-variables.json", "utf8");
eval(site_variables_json);
// site_variables object found in site_variables_json will be used later as a collection

// regular expressions
var snippetRE = /\{\{(.*?)\}\}/;
var variableRE = /\{\{(.*?)\.(.*?)\}\}/;

// Count the number of HTML files and load them.

var filesInDir = fs.readdirSync(pagesDir);

var htmlFiles = []; 

filesInDir.forEach(function(file){
	if (file.match(/\.html$/)) {
		console.log(file);
		var fileContents = fs.readFileSync(pagesDir + "\\" + file, "utf8");
		htmlFiles.push(fileContents);
	}
});

console.log("\nNumber of HTML files in \"pages\" folder: " + htmlFiles.length);

console.log("\n" + site_variables.data.length + " file references to the \"pages\" directory are included in this manifest.\n")

// Check all pages listed in the site-variables.json manifest
for (var i = 0; i < site_variables.data.length; i++) {
	//load layout
	var layoutFile = site_variables.data[i].layout;
	var newFile = fs.readFileSync(layoutsDir + "\\" + layoutFile, "utf8");
	var contentFile = site_variables.data[i].filename;
	var content = fs.readFileSync(pagesDir + "\\" + contentFile, "utf8");
	var allowLoop = true;
	var replacementMade = false;
	while (allowLoop == true) {
		replacementMade = false;
		if(!newFile.match(snippetRE)) {
			allowLoop = false;
		} else {
			var mymatch = newFile.match(snippetRE);
			if (mymatch[0].match(/\./)) {
				// We have a data variable, so insert it.
				var variableFound = mymatch[0];
				if (variableFound.match(variableRE)) {
					var varMatch = variableFound.match(variableRE);
					var variableType = varMatch[1];
					var variableToCheck = varMatch[2];
					if (variableType == "data") {
						if (site_variables.data[i].variables[variableToCheck] != null) {
							var replacementValue = site_variables.data[i].variables[variableToCheck];
							newFile = newFile.replace(variableRE, replacementValue);
							replacementMade = true;
						}
					}
					if (variableType == "common") {
						if (site_variables.common[variableToCheck] != null) {
							var replacementValue = site_variables.common[variableToCheck];
							newFile = newFile.replace(variableRE, replacementValue);
							replacementMade = true;
						}
					}
				} 
			} else {
				// We have a snippet, so insert it.
				var snippetFile = mymatch[1] + ".html";
				var snippet = fs.readFileSync(snippetDir + "\\" + snippetFile, "utf8");
				newFile = newFile.replace(snippetRE, snippet);
				replacementMade = true;
			}
		}
		if ((replacementMade == false) && (allowLoop == true)) {
			console.log("\nInvalid placeholder reference found on " + site_variables.data[i].filename + "\n");
			break;
		}
	}
	allowLoop = true;
	// Check for content
	while (allowLoop == true) {
		if(!newFile.match("[[content]]")) {
			allowLoop = false;
		} else {
			// Insert the content
			var pagesFile = site_variables.data[i].filename;
			var content = fs.readFileSync(pagesDir + "\\" + pagesFile, "utf8");
			newFile = newFile.replace("[[content]]", content);
		}
	}
	// Create the new file
	var newFileName = buildDir + "\\" + site_variables.data[i].filename;
	fs.writeFileSync(newFileName, newFile ,'utf8');
};

console.log("\nBuild complete.\n");
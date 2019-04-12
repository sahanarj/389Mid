var fs = require('fs');

function restoreOriginalData() {
    fs.writeFileSync('sublease.json', fs.readFileSync('sublease_original.json'));
}

function loadData() {
    return JSON.parse(fs.readFileSync('sublease.json'));
}

function saveData(data) {
	// sublease.json stores the sublease array under key "pokemon",
	// so we are recreating the same structure with this object
	var obj = {
		sublease: data
	};

	fs.writeFileSync('sublease.json', JSON.stringify(obj));
}

module.exports = {
    restoreOriginalData: restoreOriginalData,
    loadData: loadData,
    saveData: saveData,
}

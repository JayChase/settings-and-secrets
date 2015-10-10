var allSettings ={};

//Note the file functions here are synchronous as require is synchronous anyway. 
function settings(customSettings, settingsFiles, ignoreEnvVars, fs) {
	var _ = require('lodash');		

	if (!fs) {
		fs = require('fs');
	}

	settingsFiles = _.isArray(settingsFiles) ? settingsFiles : ['./config.json', './secrets.json'];
	customSettings = _.isObject(customSettings) ? customSettings : {};

	settingsFiles.forEach(function (settingsFile) {
		_.assign(allSettings, loadFile(settingsFile));
	});

	_.assign(allSettings, customSettings);

	if (!ignoreEnvVars) {
		applyEnvVars();
	}

	return allSettings;

	function loadFile(filePath) {
		if (fs.existsSync(filePath)) {
			var file = fs.readFileSync(filePath, 'utf8')
			try {
				return JSON.parse(file);
			} catch (error) {
				return {};
			}
		} else {
			return {};
		}
	}

	function applyEnvVars() {
		_.forOwn(allSettings, function (value, name) {
			if (process.env[name]) {
				allSettings[name] = process.env[name];
			}
		});
	}
}

module.exports = settings;
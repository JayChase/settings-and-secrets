//Note the file functions here are synchronous as require is synchronous anyway. 
function settings(fs) {
	var _ = require('lodash'),
		settings ={
			rootDir: __dirname
		},
		settingsJson = loadFile('./config.json'),			
		secretsJson = loadFile('./secrets.json');
		
	_.assign(settings,settingsJson,secretsJson);	
		
	return settings;			

	function loadFile(filePath) {
		if (fs.existsSync(filePath)) {
			var file = fs.readFileSync(filePath,'utf8')
			try {
				return JSON.parse(file);	
			} catch (error) {
				return {};
			}												
		} else {
			return {};
		}
	}
}

module.exports = settings;
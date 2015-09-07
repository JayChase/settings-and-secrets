var chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	path = require('path');

chai.should();

describe('settings', function () {
	var settings,
		configFile = {
			"rootDir": path.dirname(__dirname),
			"prop1": "one"
		},
		secretsFile = {
			"rootDir": path.dirname(__dirname),
			"prop1": "secretOne",
			"prop2": "secretThree"
		};

	beforeEach(function () {
	});

	it('should return have rootDir property', function () {
		var fs = {
			existsSync: function () { },
			readFileSync: function () { }
		};

		sinon.stub(fs, "existsSync")
			.withArgs("./config.json").returns(false)
			.withArgs("./secrets.json").returns(false);

		settings = require('../settings')(fs);

		expect(settings).to.haveOwnProperty("rootDir");
	});

	it('should return properties in settings.json', function () {
		var fs = {
			existsSync: function () { },
			readFileSync: function () { }
		};

		sinon.stub(fs, "existsSync")
			.withArgs("./config.json").returns(true)
			.withArgs("./secrets.json").returns(false);

		sinon.stub(fs, "readFileSync").returns(JSON.stringify(configFile));

		settings = require('../settings')(fs);

		expect(settings).to.haveOwnProperty("prop1");
	});

	it('should return properties in secrets.json', function () {
		var fs = {
			existsSync: function () { },
			readFileSync: function () { }
		};

		sinon.stub(fs, "existsSync")
			.withArgs("./config.json").returns(false)
			.withArgs("./secrets.json").returns(true);

		sinon.stub(fs, "readFileSync").returns(JSON.stringify(secretsFile));

		settings = require('../settings')(fs);

		expect(settings).to.haveOwnProperty("prop2");
	});

	it('should return override settings.json property with settings.json property', function () {
		var fs = {
			existsSync: function () { },
			readFileSync: function () { }
		};

		sinon.stub(fs, "existsSync")
			.withArgs("./config.json").returns(false)
			.withArgs("./secrets.json").returns(true);

		sinon.stub(fs, "readFileSync")
				.withArgs("./config.json").returns(JSON.stringify(configFile))
				.withArgs("./secrets.json").returns(JSON.stringify(secretsFile));

		settings = require('../settings')(fs);

		expect(settings.prop1).to.equal("secretOne");
	});
});
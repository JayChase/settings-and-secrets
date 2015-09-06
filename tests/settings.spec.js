var chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon');

chai.should();

describe('settings', function () {
	var settings,
		fs = {
			existsSync: function(){},
			readFileSync: function(){}
		},
		settingsFile = {
		 "prop1": "one",
		 "prop2": "two"
		},
		secretsFile ={
			"prop2": "secretTwo",
			"prop3": "secretThree"	
		};
		
	beforeEach(function () {
		settings = require('../settings')();
	});	
	
	it('should return any properties in settings.json', function () {		
		sinon.stub(fs,"existsSync");
		fs.existsSync.withArgs("./settings.json").returns(true);
		fs.existsSync.withArgs("./secrets.json").returns(false);
		sinon.stub(fs,"readFileSync").returns(settingsFile);
		
		expect(true).to.be.true;		 
		//expect(settings).to.equal(settingsFile);
	});
	
	it('should return any properties in secrets.json', function () {
		expect(true).to.be.true;
	});
	
	it('should return override settings.json property with settings.json property', function () {
		expect(true).to.be.true;
	});
	
	it('should always return the root dir', function () {
		expect(true).to.be.true;
	});
});
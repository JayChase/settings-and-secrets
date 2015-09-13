##settings and secrets
A NodeJS module to help manage configuration settings.

##Getting started
```
var settings = require('settings-and-secrets')();
```

By default the module will look for **config.json** and **secrets.json** in the root folder of the project. Environment variables will override config file values.
When first adding **secrets.json** remember to add it to the **.gitigrnore** file so it doesn't get added to the repository. 
All settings value will be available as properties of **settings**. 

##Installation
```
npm install settings-and-secrets
```

##Configuration
To add custom settings (which will override any settings of the same name in **config.json** or **secrets.json**) pass in a custom settings object as the first argument to the constructor. 

```
var settings = require('settings-and-secrets')({
		rootDir: __dirname
	});
```

To change to json files to be used pass in an array of new files (with full paths) as the second argument to the constructor.

```
var settings = require('settings-and-secrets')(null,['./settings/connectionStrings.json','./settings/urls.json']);
```
Note that the new files array will replace the existing config file list not merge with it so if you still want to use the default config and secrets files you wil have to add those too.

To ignore environment variables and always use config files values set ignoreEnvVars to true.
```
var settings = require('settings-and-secrets')(null,null,true]);
```

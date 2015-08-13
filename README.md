# JavaScript Testing Set Up for Browser & Node.js
1. Install node.js https://nodejs.org/
2. Run `npm install -g bower` to install the bower package manager
3. Navigate to project directory (javascript folder with app/ and test/)
4. Run `bower init` to generate bower.json file
```json
{
  "name": "Project Name",
  "version": "1.0.0"
}
```
5. Run `npm init` to generate package.json file
```json
{
  "name": "Project Name",
  "version": "1.0.0",
  "main": "test.js",
  "scripts": {
    "test": "mocha -R spec"
  }
}
```
6. Run `bower install mocha chai` to install mocha and chai for browser
7. Run `npm install mocha chai` to install mocha and chai for node
8. Run `bower install http://sinonjs.org/releases/sinon-X.X.X.js` where X refers to each version number (see http://sinonjs.org/download/ for current version). This gets you the built version of sinon for the browser
9. Run `npm install sinon` to install sinon for node
10. Setup boilerplate code for testing in the browser
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Javascript Testing</title>
	<link rel="stylesheet" href="../bower_components/mocha/mocha.css" />
</head>
<body>
	<div id="mocha"></div>
	<script src="../bower_components/chai/chai.js"></script>
	<script src="../bower_components/mocha/mocha.js"></script>
	<script src="../bower_components/sinon-X.X.X/index.js"></script>
	<script src="../app/functions.js"></script>
	<script>mocha.setup('bdd')</script>
	<script src="test.js"></script>
	<script>
		mocha.run();
	</script>
</body>
</html>
```


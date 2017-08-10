const server = require('../src/server');
const Options = require('../src/options');
const options = Options.gatherOptions();
server.start(options);
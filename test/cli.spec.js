const execFile = require('child_process').execFile;
const expect = require('chai').expect;
describe('cli', function () {
	describe('usage', function () {
		it('should show the usage text when given the -h flag', function (done) {
			execFile('node', ['./bin/swamp.js', '-h'], {}, function (err, stdout, stderr) {
				expect(stdout).to.equal(
					"swamp target [OPTIONS]\n" +
					"OPTIONS:\n" +
					"-h | --help : shows usuage\n" +
					"--delay: adds that much delay to each call\n"
				);
				done();
			});
		});

		it('should show the usage text when given the --help flag', function (done) {
			execFile('node', ['./bin/swamp.js', '--help'], {}, function (err, stdout, stderr) {
				expect(stdout).to.equal(
					"swamp target [OPTIONS]\n" +
					"OPTIONS:\n" +
					"-h | --help : shows usuage\n" +
					"--delay: adds that much delay to each call\n"
				);
			});
		});
	});
});
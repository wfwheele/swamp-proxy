function showUsage(extraMessage) {
	if (extraMessage) {
		console.log(extraMessage);
	}
	console.log(
		"swamp target [OPTIONS]\n" +
		"\tOPTIONS:\n" +
		"\t-h | --help : shows usuage\n" +
		"\t--delay: adds that much delay to each call\n"
	);
	process.exit(1);
}

function gatherOptions() {
	const options = {
		delay: 10
	};
	const target = process.argv[2];
	if (!target) {
		showUsage();
	}
	options.target = target;
	const args = process.argv.slice(3);
	let i;
	while (i < args.length) {
		const arg = args[i];
		if (arg === '-h' || arg === '--help') {
			printUsage();
		} else if (arg === '--delay') {
			let delay = arg[i + 1];
			i++;
			options.delay = delay;
		} else {
			printUsage();
		}
		i++;
	}
	return options;
}

module.exports = {
	gatherOptions: gatherOptions
};
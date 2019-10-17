const execa = require('execa');
const chalk = require('chalk');
const branch = require('git-branch');
const Listr = require('listr');
const checkDependencies = require('check-dependencies');
const isOnline = require('is-online');
const hasYarn = require('has-yarn');

async function execPrestart() {
	const { stdout: nodeVersion } = await execa('node', ['-v']);
	const { stdout: gitEmail } = await execa('git', ['config', 'user.email']);
	const branchName = branch.sync();

	console.log('🔑 ', '', chalk.bold('PreStart'));
	console.log('');

	console.log(chalk.bold('Project details'));
	console.log(chalk.gray('--------------------------------------------'));
	console.log('node  ', 'version  ', nodeVersion.replace('v', ''));
	console.log('git   ', 'branch   ', branchName);
	console.log('      ', 'email    ', gitEmail);
	console.log(chalk.gray('--------------------------------------------'));
	console.log('');

	const tasks = new Listr([
		{
			title: `${chalk.grey('[1/2]')} 🔌   Checking connection...`,
			task: (ctx, task) => {
				return isOnline({ timeout: 2500 }).then((online) => {
					ctx.isOnline = online;
				});
			},
		},
		{
			title: `${chalk.grey('[2/2]')} 🚚   Fetching packages...`,
			task: (ctx, task) => {
				if (!ctx.isOnline) {
					task.skip(
						"Looks like you're offline. We'll skip dependency fetching."
					);
				}

				if (hasYarn()) {
					return execa('yarn');
				} else {
					const hasDependencies = checkDependencies.sync({
						checkGitUrls: true,
						install: false,
						packageManager: 'npm',
						verbose: false,
					}).depsWereOk;

					if (hasDependencies) {
						return Promise.resolve();
					} else {
						return execa('npm', ['install']);
					}
				}
			},
		},
	]);

	tasks
		.run()
		.then(() => {
			console.log('');
			console.log(chalk.green('Success!'));
			console.log('✨ ', 'Have fun developing!');
			console.log('');
		})
		.catch((err) => {
			console.log('');
			console.log(chalk.red('Error!'));
			console.error(err);
			console.log('');
		});
}

function Prestart() {
	return execPrestart();
}

function sync(cb) {
	new Prestart().then(cb).catch(cb);
}

function prestart() {
	return new Prestart();
}

prestart.sync = sync;

module.exports = prestart;

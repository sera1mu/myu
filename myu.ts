import { Command } from 'cliffy';
import { VERSION } from './util/constants.ts';
import { Logger } from './util/Logger.ts';
import { ListRemoteCommand } from './commands/ls-remote.ts';

const logger = new Logger(false, true);

const commands = [
  new ListRemoteCommand(logger),
];

const app = new Command()
  .name('Myu')
  .version(VERSION)
  .description('The simple version manager for Deno');

for (const command of commands) {
  app.command(command.getName(), command);
}

const { cmd } = await app.parse(Deno.args);

if (cmd.getName() === 'Myu') {
  logger.error('No arguments specified. Try "myu --help" for more information');
  Deno.exit(1);
}

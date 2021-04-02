import { Command } from 'cliffy';
import {
  DENO_REPO_NAME,
  DENO_REPO_OWNER,
  GITHUB_API_BASE,
} from '../util/constants.ts';
import { getRepoTags } from '../util/github.ts';
import { Logger } from '../util/Logger.ts';

/**
 * List available versions
 */
export class ListRemoteCommand extends Command {
  private logger: Logger;

  constructor(logger: Logger) {
    super();

    this.logger = logger;

    this
      .name('ls-remote')
      .description('Lists the versions available for installation.')
      .action(async () => await this.run());
  }

  async run(): Promise<void> {
    try {
      const tags = await getRepoTags(
        DENO_REPO_OWNER,
        DENO_REPO_NAME,
      );

      for (const tag of tags) {
        console.log(tag.name);
      }
    } catch (err) {
      this.logger.error(err.stack);
    }
  }
}

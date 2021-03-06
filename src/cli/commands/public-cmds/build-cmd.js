/** @flow */
import Command from '../../command';
import { buildInline } from '../../../api/consumer';
import { buildInScope } from '../../../api/scope';

const chalk = require('chalk');

export default class Build extends Command {
  name = 'build <id>';
  description = 'uses the compiler defined in the bit.json in order to return the compiled version of the component';
  alias = '';
  opts = [
    ['i', 'inline', 'create a compiled file on an inline component (dist/dist.js)'],
    ['e', 'environment', 'also pre install the required environment bit before running the build'],
    ['s', 'save', 'for running build and save the results in the model']
  ];
  
  action([id]: string[], { inline, save, environment }: {
    inline: ?bool,
    save: ?bool,
    environment: ?bool,
  }): Promise<any> {
    function build() {
      if (inline) return buildInline(id);
      return buildInScope(id, environment, save);
    }
    
    return build()
    .then(res => ({
      res,
      inline,
    }));
  }

  report({ res, inline }: { res: ?string, inline: ?bool }): string {
    if (!res) return chalk.red('there is no compiler to that component');
    if (inline) { return chalk.cyan(res); }
    return res;
  }
}

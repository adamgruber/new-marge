import {
  belongsTo,
  createServer,
  hasMany,
  Model,
  RestSerializer,
} from 'miragejs';
import seedData from './data2.json';

export function makeServer({ environment = 'test' }) {
  return createServer({
    environment,

    models: {
      suite: Model.extend({
        suites: hasMany('suite', { inverse: 'parent' }),
        tests: hasMany(),
        hooks: hasMany(),
        parent: belongsTo('suite', { inverse: 'suites' }),
      }),

      test: Model.extend({
        parent: belongsTo('suite'),
      }),

      hook: Model.extend({
        parent: belongsTo('suite'),
      }),
    },

    serializers: {
      suite: RestSerializer.extend({
        include: ['suites', 'tests', 'hooks'],
        embed: true,
      }),
    },

    seeds(server) {
      const { suites, tests, hooks } = seedData.results;
      Object.values(suites)
        .reverse()
        .forEach(suite => {
          let found = null;
          if (suite.isRoot) {
            server.create('suite', suite);
          } else if (suite.parent) {
            found = server.schema.find('suite', suite.parent);
            server.create('suite', {
              ...suite,
              parent: found,
            });
          }
        });

      Object.values(tests).forEach(test => {
        const parent = server.schema.find('suite', test.parent);
        server.create('test', { ...test, parent });
      });

      Object.values(hooks).forEach(hook => {
        const parent = server.schema.find('suite', hook.parent);
        server.create('hook', { ...hook, parent });
      });
    },

    routes() {
      this.namespace = 'api';
      this.get('/suites', (schema, request) => {
        return schema.suites.all();
      });

      this.get('/suites/root', (schema, request) => {
        return schema.suites.findBy({ isRoot: true });
      });

      this.get('/tests', (schema, request) => {
        return schema.tests.all();
      });
    },
  });
}

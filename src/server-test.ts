import {
  belongsTo,
  createServer,
  hasMany,
  Model,
  RestSerializer,
} from 'miragejs';

const myServer = createServer({
  models: {
    suite: Model.extend({
      suites: hasMany('suite'),
      parent: belongsTo('suite', { inverse: null }),
    }),
  },

  serializers: {
    suite: RestSerializer.extend({
      // TODO: make a custom serializer to remove parent ids from `suites` array
      // include: ['tests', 'hooks'],
    }),
  },

  // seeds(server) {
  //   const suiteA = server.create('suite', {
  //     id: 'suiteA',
  //     parent: null,
  //   });
  //   const suiteB = server.create('suite', {
  //     id: 'suiteB',
  //     parent: suiteA,
  //   });
  //   const suiteC = server.create('suite', {
  //     id: 'suiteC',
  //     parent: suiteB,
  //   });
  // },
});

window.myServer = myServer;

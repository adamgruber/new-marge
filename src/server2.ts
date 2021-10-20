import {
  belongsTo,
  createServer,
  hasMany,
  Model,
  RestSerializer,
} from 'miragejs';

export default function makeServer() {
  return createServer({
    models: {
      item: Model.extend({
        items: hasMany('item', { inverse: 'parent' }),
        parent: belongsTo('item', { inverse: 'items' }),
      }),
    },

    seeds(server) {
      const itemA = server.create('item', { parent: null });
      const itemB = server.create('item', { parent: itemA });
      const itemC = server.create('item', { parent: itemB });
    },

    serializers: {
      application: RestSerializer,
      include: ['items'],
    },

    routes() {
      this.namespace = 'api';
      this.get('/items', schema => schema.items.all());
    },
  });
}

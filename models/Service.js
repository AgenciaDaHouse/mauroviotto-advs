var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Service Model
 * ==========
 */
var Service = new keystone.List('Service', {
  autokey: { from: 'name', path: 'key', unique: true },
  sortable: true
});

Service.add({
  name: { type: String, required: true },
  picture: { type: Types.CloudinaryImage },
  startedAt: { type: Number },
  info: { type: Types.Textarea }
});

/**
 * Registration
 */
Service.register();

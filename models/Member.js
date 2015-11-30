var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Member Model
 * ==========
 */
var Member = new keystone.List('Member', {
  autokey: { from: 'name', path: 'key', unique: true },
  sortable: true
});

Member.add({
  name: { type: String, required: true },
  picture: { type: Types.CloudinaryImage },
  info: { type: Types.Textarea },
  role: { type: Types.Relationship, ref: 'Role' }
});

/**
 * Registration
 */
Member.register();

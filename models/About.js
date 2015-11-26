var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * About Model
 * ==========
 */
var About = new keystone.List('About', {
  autokey: { from: 'name', path: 'key', unique: true },
  sortable: true
});

About.add({
  name: { type: String, required: true },
  text: { type: Types.Textarea }
});

/**
 * Registration
 */
About.register();

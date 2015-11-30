var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Banner Model
 * ==========
 */
var Banner = new keystone.List('Banner', {
  autokey: { from: 'name', path: 'key', unique: true },
  sortable: true
});

Banner.add({
  name: { type: String, required: true },
  image: { type: Types.CloudinaryImage }
});

/**
 * Registration
 */
Banner.register();

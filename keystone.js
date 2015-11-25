require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var ENV = keystone.get('env');

keystone.init({
  'name': 'Mauro Viotto Advogados',
  'brand': 'Mauro Viotto Advogados',

  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'jade',

  'emails': 'templates/emails',

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User'
});

keystone.import('models');

keystone.set('locals', {
  _: require('underscore'),
  env: ENV,
  utils: keystone.utils,
  editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));

keystone.set('email locals', {
  logo_src: '/images/logo-email.gif',
  logo_width: 194,
  logo_height: 76,
  theme: {
    email_bg: '#f9f9f9',
    link_color: '#2697de',
    buttons: {
      color: '#fff',
      background_color: '#2697de',
      border_color: '#1a7cb7'
    }
  }
});

keystone.set('email rules', [{
  find: '/images/',
  replace: (ENV === 'production') ? (process.env.DOMAIN_URL + '/images/') : 'http://localhost:3000/images/'
}, {
  find: '/keystone/',
  replace: (ENV === 'production') ? (process.env.DOMAIN_URL + '/keystone/') : 'http://localhost:3000/keystone/'
}]);

keystone.set('email tests', require('./routes/emails'));

keystone.set('nav', {
  'enquiries': 'enquiries',
  'users': 'users'
});

keystone.start();

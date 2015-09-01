
angular.module('cartExample.services', [])
.factory('Products', function() {

  var potions = [{
      'id': 0,
      'name': 'Great Health Potion',
      'excerpt': 'Regenera, em média, 500 hit points. Só pode ser consumido por Knights level 80 ou mais.',
      'weight': 3.1,
      'minLevel': 80,
      'vocations': [
        'Knight',
        'Elite Knight'
      ],
      'price': 190,
      'image_name': 'great_health_potion'
    },
    {
      'id': 1,
      'name': 'Great Mana Potion',
      'excerpt': 'Regenera, em média, 200 Mana Points. Só pode ser consumido por Mages level 80 ou mais.',
      'weight': 3.1,
      'minLevel': 80,
      'vocations': [
        'Druid',
        'Elder Druid',
        'Sorcerer',
        'Master Sorcerer'
      ],
      'price': 120,
      'image_name': 'great_mana_potion'
    },
    {
      'id': 2,
      'name': 'Great Spirit Potion',
      'excerpt': 'Regenera, em média, 300 Hit Points e 150 Mana Points. Só pode ser consumido por Paladins level 80 ou mais.',
      'weight': 3.1,
      'minLevel': 80,
      'vocations': [
        'Paladin',
        'Royal Paladin'
      ],
      'price': 190,
      'image_name': 'great_spirit_potion'
    },
    {
      'id': 3,
      'name': 'Health Potion',
      'excerpt': 'Regenera, em média, 150~200HP.',
      'weight': 2.7,
      'minLevel': 0,
      'vocations': [
        'Druid',
        'Elder Druid',
        'Knight',
        'Elite Knight',
        'Paladin',
        'Royal Paladin',
        'Sorcerer',
        'Master Sorcerer'
      ],
      'price': 45,
      'image_name': 'health_potion'
    },
    {
      'id': 4,
      'name': 'Mana Potion',
      'excerpt': 'Regenera em média de 70~130MP.',
      'weight': 2.7,
      'minLevel': 0,
      'vocations': [
        'Druid',
        'Elder Druid',
        'Knight',
        'Elite Knight',
        'Paladin',
        'Royal Paladin',
        'Sorcerer',
        'Master Sorcerer'
      ],
      'price': 50,
      'image_name': 'mana_potion'
    },
    {
      'id': 5,
      'name': 'Strong Health Potion',
      'excerpt': 'Regenera, em média, 300 hit points. Só pode ser consumido por Knights e Paladins de level 50 ou mais.',
      'weight': 2.9,
      'minLevel': 50,
      'vocations': [
        'Knight',
        'Elite Knight',
        'Paladin',
        'Royal Paladin'
      ],
      'price': 100,
      'image_name': 'strong_health_potion'
    },
    {
      'id': 6,
      'name': 'Strong Mana Potion',
      'excerpt': 'Regenera, em média, 150 Mana Points. Só pode ser consumido por Mages e Paladins de level 50 ou mais.',
      'weight': 2.9,
      'minLevel': 50,
      'vocations': [
        'Druid',
        'Elder Druid',
        'Sorcerer',
        'Master Sorcerer',
        'Paladin',
        'Royal Paladin'
        ],
      'price': 80,
      'image_name': 'strong_mana_potion'
    },
    {
      'id': 7,
      'name': 'Ultimate Health Potion',
      'excerpt': 'Regenera, em média, 750 hit points. Só pode ser consumido por Knights level 130 ou mais.',
      'weight': 3.1,
      'minLevel': 130,
      'vocations': [
        'Knight',
        'Elite Knight'
      ],
      'price': 310,
      'image_name': 'ultimate_health_potion'
    }
  ];

  return {
    all: function () {
      return potions;
    },
    get: function (id) {
      var potion;
      potions.forEach(function (pot) {
        if (pot.id === ~~id) {
          potion = pot;
          return;
        }
      });

      if (potion) {
        return potion;
      }
    }
  };
})
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    getArray: function(key) {
      return JSON.parse($window.localStorage[key]  || '[]');
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

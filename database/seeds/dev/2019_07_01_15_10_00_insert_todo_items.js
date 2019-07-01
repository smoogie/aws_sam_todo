module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('gardens', [{
      id: 1,
      list_id: 1,
      status: 1,
      title: 'open item',
      description: 'Thi is open item 1'
    },{
      id: 2,
      list_id: 1,
      status: 3,
      title: 'done item',
      description: 'Thi is done item'
    },{
      id: 3,
      list_id: 2,
      status: 1,
      title: 'in progress item',
      description: 'Thi is in progress item'
    },{
      id: 4,
      list_id: 2,
      status: 1,
      title: 'cookies',
      description: 'Some nice chocko cookies'
    },{
      id: 5,
      list_id: 2,
      status: 1,
      title: 'water',
      description: 'We need water'
    },{
      id: 6,
      list_id: 3,
      status: 1,
      title: 'open item',
      description: 'Thi is open item 1'
    },{
      id: 7,
      list_id: 3,
      status: 1,
      title: 'open item 2',
      description: 'Thi is open item 2'
    }]);
  }
};

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('gardens', [{
      id: 1,
      user_id: 1,
      title: 'to do list'
    },{
      id: 2,
      user_id: 1,
      name: 'shopping list'
    },{
      id: 3,
      user_id: 2,
      name: 'to do list user2'
    }]);
  }
};

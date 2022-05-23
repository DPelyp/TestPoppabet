const faker = require('faker');
const fs = require('fs')

function generateFakeData() {

  let users = []

  for (let id=1; id <= 5; id++) {

    let RANDOM_NAME = faker.name.findName();
    let RANDOM_LAST_NAME = faker.name.lastName();
    let RANDOM_EMAIL = faker.internet.email();
    let RANDOM_ADDRESS = faker.address.streetAddress();
    users.push({
        "id": id,
        "first_name": RANDOM_NAME,
        "last_name": RANDOM_LAST_NAME,
        "email": RANDOM_EMAIL,
        "address" : RANDOM_ADDRESS,
        "phoneNumber" : RANDOM_PHONE_NUMBER = faker.datatype.number({
          'min': 100000000,
          'max': 999999999
        })
    });
  }

  return { "data": users }
}

let dataObj = generateFakeData();

fs.writeFileSync('testData.json', JSON.stringify(dataObj, null, '\t'));
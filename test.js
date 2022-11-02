import KSON from './lib/index.js'

const json = JSON.stringify({
  fullName: 'Valentin Wagner',
  firstName: 'Valentin',
  lastName: 'Wagner',
  age: 21,
  emailAddress: 'valentin.wagner@mail.com',
  location: {
    cityName: 'some city',
    postalCode: 77777,
    country: 'Germany'
  }
})

console.log(KSON.parse(json, 'camel', 'snake'))

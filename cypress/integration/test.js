{/* <reference types="cypress" /> */}

import {PageElements} from '../support/locators.js';
// import faker from 'faker';
const jsonData = require('../fixtures/testData.json');
var generator = require('generate-password');



const pe = new PageElements()

// const RANDOM_NAME = faker.name.findName();
// const RANDOM_LAST_NAME = faker.name.lastName();
// const RANDOM_EMAIL = faker.internet.email();
// const RANDOM_ADDRESS = faker.address.streetAddress();
// const RANDOM_PHONE_NUMBER = faker.datatype.number({
//   'min': 100000000,
//   'max': 999999999
// });
// const RANDOM_EMAIL_QUICK_FORM = faker.internet.email();
// const RANDOM_PHONE_NUMBER_QUICK_FORM = faker.datatype.number({
//   'min': 100000000,
//   'max': 999999999
// });


var password = generator.generate({
	length: 10,
	numbers: false,
  uppercase: true,
  lowercase : true,
  symbols : false
});

function randomCountry () {
  const countries = ["784", "809", "810"];
  const rand = Math.floor(Math.random()*countries.length);
  return countries[rand];
  };

  function randomAge () {
    const years = ["1999", "2000", "2001"]; 
    const rand = Math.floor(Math.random()*years.length);
    return years[rand];
  };

  function randomMonths () {
    const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; 
    const rand = Math.floor(Math.random()*months.length);
    return months[rand];
  };

  function randomDay () {
    const days = ['1', '2', '3', '4', '5']; 
    const rand = Math.floor(Math.random()*days.length);
    return days[rand];
  };

  function randomGender () {
    const gender = ['1', '2']; 
    const rand = Math.floor(Math.random()*gender.length);
    return gender[rand];
  };

  function randomCountrySecond () {
    const countries = ["784", "809", "810"];
    const rand = Math.floor(Math.random()*countries.length);
    return countries[rand];
    };

    function randomCurrency () {
      const currency = ["USD", "EUR", "UYU", "RUB"];
      const rand = Math.floor(Math.random()*currency.length);
      return currency[rand];
      };


  


describe('User registartaion Full', () => {
    before (()=> {
      cy.visit(Cypress.env("baseURL"))});

      it('Generate json by command', () => {
        cy.generateFixture(2)
    })

    //------------------------------------

    function createJson(x){
      const faker = require('faker')
  
      cy.writeFile('cypress/fixtures/JSONv2.json', {
        'hits':Cypress._.times(x, () => {
          return {
            'title':`${faker.lorem.words(3)}`,
            'url':`${faker.internet.url()}`,
            'author':`${faker.name.firstName()} ${faker.name.lastName()}`,
            'num_comments':`${faker.datatype.number()}`,
            'points':`${faker.datatype.number()}`,
            'objectID':`${faker.datatype.uuid()}`,
          }
        })
      })

    }

    it.only('Generate json by fucntion', () => {  
      createJson(3)
  })


   //------------------------------------

    it('Form 1 Registration', () => {
      cy.get(pe.registrationButton).wait(5000).click(),
      cy.get(pe.fullRegButton).should('have.class', 'active'),
      cy.get(pe.accInfoButton).should('have.text', 'ACCOUNT INFORMATION'),
      cy.get(pe.passwordInfo).should('have.text',' Lowercase letter is required Upper case letter is required Digit is not allowed Symbol is not allowed Maximum length is 16 Minimum length is 6'),
      cy.get(pe.userName).click().should('be.visible').type(jsonData["data"][0]["first_name"]).should("have.value", jsonData["data"][0]["first_name"]),
      cy.get(pe.email).click().should('be.visible').type(jsonData["data"][0]["email"]).should("have.value", jsonData["data"][0]["email"]),
      cy.get(pe.password).click().should('be.visible').type(password).should('have.value', password),
      cy.get(pe.confirmPassword).click({ multiple: true }).should('be.visible').type(password, { multiple: true }).should('have.value', password),
      cy.get(pe.country).select(randomCountry()).should('not.be.empty'),
      cy.get(pe.nextButton).click()
  })

  it('Form 2 Registration', () => {
    cy.get(pe.accInfoButton).should('have.text', 'PERSONAL DETAILS')
    cy.get(pe.firstName).type(jsonData["data"][1]["first_name"]).should('have.value', jsonData["data"][1]["first_name"]),
    cy.get(pe.lastName).type(jsonData["data"][1]["last_name"]).should('have.value', jsonData["data"][1]["last_name"]),
    cy.get(pe.birthDate).select(randomAge()).should('not.be.empty'),
    cy.get(pe.birthMonths).select(randomMonths()).should('not.be.empty'),
    cy.get(pe.birthDay).select(randomDay()).should('not.be.empty'),
    cy.get(pe.gender).select(randomGender()).should('not.be.empty'),
    cy.get(pe.country).select(randomCountrySecond()).should('not.be.empty'),
    cy.get(pe.city).select('Select City').should('not.be.empty'),
    cy.get(pe.nextButtonSecond).click()
}) 

it('Form 3 Registration', () => {
cy.get(pe.accInfoButton).should('have.text', 'CONTACT DETAILS')
 cy.get(pe.address).click().should('be.visible').type(jsonData["data"][1]["address"]).should('have.value', jsonData["data"][1]["address"]),
 cy.get(pe.currency).select(randomCurrency()).should('not.be.empty'),
 cy.get(pe.countryCode).should("be.visible"),
 cy.get(pe.phoneNumber).click().type(jsonData["data"][0]["phoneNumber"]).should('be.visible'),
 cy.get(pe.checkbox).click().should('be.checked'),
 cy.get('.craft_btn').click(),
 cy.get('.title').should('have.text', 'Congratulations, You have successfully registered!')
})
});

describe('User registartaion Quick Form first', () => {
  before (()=> {
    cy.wait(5000)
    cy.visit(Cypress.env("baseURL"))});

  it('Email Registration Form', () => {
    cy.get(pe.registrationButton).wait(3000).click(),
    cy.get(pe.quickFormButton).click().should('not.have.class', 'inactive'),
    cy.get(pe.emailQuick).click().type(jsonData["data"][1]["email"]).should('have.value', jsonData["data"][1]["email"]),
    cy.get(pe.currency).select(randomCurrency()).should('not.be.empty'),
    cy.get(pe.checkbox).click().should('be.checked'),
    cy.get(pe.registerButton).should('have.class', 'active-item').click(),
    cy.get(pe.userProfile).click(),
    cy.get(pe.logoutButton).click()
  })
})

  describe('User registartaion Quick second', () => {
    before (()=> {
      cy.wait(5000)
      cy.visit(Cypress.env("baseURL"))});

  it('Phone Registration Form', () => {
    cy.get(pe.registrationButton, {timeout : 30000}).click(),
    cy.get(pe.quickFormButton).should('not.have.class', 'inactive').click(),
    cy.get(pe.phoneValue).select("Mobile").should('have.value', 'Mobile'),
    cy.get(pe.countryCode).should("be.visible"),
    cy.get(pe.phoneNumber).click().type(jsonData["data"][1]["phoneNumber"]).should('be.visible'),
    cy.get(pe.currency).select(randomCurrency()).should('not.be.empty'),
    cy.get(pe.checkbox).click().should('be.checked'),
    cy.get(pe.registerButton).should('have.class', 'active-item').click()
  })
})



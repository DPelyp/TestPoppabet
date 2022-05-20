{/* <reference types="cypress" /> */}

import {PageElements} from '../support/locators.js';
import faker from 'faker';
var generator = require('generate-password');

const pe = new PageElements()

const RANDOM_NAME = faker.name.findName();
const RANDOM_LAST_NAME = faker.name.lastName();
const RANDOM_EMAIL = faker.internet.email();
const RANDOM_ADDRESS = faker.address.streetAddress();
const RANDOM_PHONE_NUMBER = faker.datatype.number({
  'min': 100000000,
  'max': 999999999
});
const RANDOM_EMAIL_QUICK_FORM = faker.internet.email()
const RANDOM_PHONE_NUMBER_QUICK_FORM = faker.datatype.number({
  'min': 100000000,
  'max': 999999999
});


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
  }

  function randomAge () {
    const years = ["1999", "2000", "2001"]; 
    const rand = Math.floor(Math.random()*years.length);
    return years[rand];
  }

  function randomMonths () {
    const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; 
    const rand = Math.floor(Math.random()*months.length);
    return months[rand];
  }

  function randomDay () {
    const days = ['1', '2', '3', '4', '5']; 
    const rand = Math.floor(Math.random()*days.length);
    return days[rand];
  }

  function randomGender () {
    const gender = ['1', '2']; 
    const rand = Math.floor(Math.random()*gender.length);
    return gender[rand];
  }

  function randomCountrySecond () {
    const countries = ["784", "809", "810"];
    const rand = Math.floor(Math.random()*countries.length);
    return countries[rand];
    }

    function randomCurrency () {
      const currency = ["USD", "EUR", "UYU", "RUB"];
      const rand = Math.floor(Math.random()*currency.length);
      return currency[rand];
      }
  


describe('User registartaion Full', () => {
    before (()=> {
      cy.visit(Cypress.env("baseURL"))});

    it('Form 1 Registration', () => {
      cy.get(pe.registrationButton).click(),
      cy.get(pe.userName).click().should('be.visible').type(RANDOM_NAME),
      cy.get(pe.email).click().should('be.visible').type(RANDOM_EMAIL),
      cy.get(pe.password).click().should('be.visible').type(password).should('have.value', password),
      cy.get(pe.confirmPassword).click({ multiple: true }).should('be.visible').type(password, { multiple: true }).should('have.value', password),
      cy.get(pe.country).select(randomCountry()).should('be.visible')
      cy.get(pe.nextButton).click()
  })

  it('Form 2 Registration', () => {
    cy.get(pe.firstName).type(RANDOM_NAME).should('have.value', RANDOM_NAME),
    cy.get(pe.lastName).type(RANDOM_LAST_NAME).should('have.value', RANDOM_LAST_NAME),
    cy.get(pe.birthDate).select(randomAge()).should('be.visible'),
    cy.get(pe.birthMonths).select(randomMonths()).should('be.visible'),
    cy.get(pe.birthDay).select(randomDay()).should('be.visible'),
    cy.get(pe.gender).select(randomGender()).should('be.visible'),
    cy.get(pe.country).select(randomCountrySecond()).should('be.visible'),
    cy.get(pe.city).select('Select City').should('be.visible'),
    cy.get(pe.nextButtonSecond).click()
}) 
it('Form 3 Registration', () => {
 cy.get(pe.address).click().should('be.visible').type(RANDOM_ADDRESS).should('have.value', RANDOM_ADDRESS),
 cy.get(pe.currency).select(randomCurrency()).should('be.visible'),
 cy.get(pe.countryCode).should("be.visible"),
 cy.get(pe.phoneNumber).click().should('be.visible').type(RANDOM_PHONE_NUMBER).should('be.visible'),
 cy.get(pe.checkbox).click().should('be.checked'),
 cy.get(pe.registerButton).should('be.visible').click()
})
});

describe('User registartaion Quick', () => {
  before (()=> {
    cy.visit(Cypress.env("baseURL"))});

  it('Email Registration Form', () => {
    cy.get(pe.registrationButton).click(),
    cy.get(pe.quickFormButton).click(),
    cy.get(pe.emailQuick).click().type(RANDOM_EMAIL_QUICK_FORM).should('have.value', RANDOM_EMAIL_QUICK_FORM),
    cy.get(pe.currency).select(randomCurrency()).should('be.visible'),
    cy.get(pe.checkbox).click().should('be.checked'),
    cy.get(pe.registerButton).should('be.visible').click(),
    cy.get(pe.userProfile).click(),
    cy.get(pe.logoutButton).click()
  })

  it('Phone Registration Form', () => {
    cy.get(pe.registrationButton, {timeout : 30000}).click(),
    cy.get(pe.quickFormButton).click(),
    cy.get(pe.phoneValue).select("Mobile"),
    cy.get(pe.countryCode).should("be.visible"),
    cy.get(pe.phoneNumber).click().type(RANDOM_PHONE_NUMBER_QUICK_FORM).should('be.visible'),
    cy.get(pe.currency).select(randomCurrency()).should('be.visible'),
    cy.get(pe.checkbox).click().should('be.checked'),
    cy.get(pe.registerButton).should('be.visible').click()
  })
})



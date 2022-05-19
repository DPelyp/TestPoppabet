import * as testData from '../support/testData.js'
import {pageElements} from '../support/locators.js'
var generator = require('generate-password');

var password = generator.generate({
	length: 10,
	numbers: false,
  uppercase: true,
  lowercase : true,
  symbols : false
});

export function randomCountry () {
  const myArray = ["Ukraine", "Uganda", "Spain"];
  const rand = Math.floor(Math.random()*myArray.length);
  return myArray[rand];
  }

describe('User registartaion Full', () => {
    before (()=> {
      cy.visit(Cypress.env("baseURL"))});
      const pe = new Elements()
    it('Form 1 Registration', () => {
      cy.get(pe.registrationButton).click().should('be.visible'),
      cy.get('.form-controls-container > :nth-child(1) > .form_field > .ng-untouched').click().should('be.visible')
      .type(testData.RANDOM_NAME),
      cy.get('.form-controls-container > :nth-child(2) > .form_field > .ng-untouched').click().should('be.visible')
      .type(testData.RANDOM_EMAIL),
      cy.get(':nth-child(1) > .form_field > .ng-untouched').click().should('be.visible').type(password).should('have.value', password),
      cy.get('.form_field > .ng-pristine').click({ multiple: true }).should('be.visible').type(password, { multiple: true }).should('have.value', password),
      cy.get('.custom_dropdown_reg').select(randomCountry()).should('be.visible')
      cy.get('.craft_btn').should('be.visible').click()
  })

//   it('Form 2 Registration', () => {
//     cy.get(':nth-child(1) > .form_field > .ng-untouched').type(ok).should('have.value', ok)
// })
});


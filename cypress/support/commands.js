// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

  //   it("Generate json by command", () => {
  //     cy.generateFixture(2);
  //   });
  // })

  //------------------------------------

  // function createJson(x) {
  //   const faker = require("faker");

  //   cy.writeFile("cypress/fixtures/example.json", {
  //     hits: Cypress._.times(x, () => {
  //       return {
  //         first_name: `${faker.name.findName()}`,
  //         last_name: `${faker.name.lastName()}`,
  //         email: `${faker.internet.email()}`,
  //         address: `${faker.address.streetAddress()}`,
  //         phoneNumber: `${faker.datatype.number({
  //           min: 100000000,
  //           max: 999999999,
  //         })}`,
  //       };
  //     }),
  //   });
  // }


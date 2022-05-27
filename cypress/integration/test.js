///<reference types="cypress" />

import { PageElements } from "../support/locators.js";
// import faker from 'faker';
import * as funcs from "../support/funcs.js";
import ex from "../fixtures/example.json";

//const userData = require("../fixtures/example.json");
var generator = require("generate-password");

const pe = new PageElements();

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
  lowercase: true,
  symbols: false,
});

describe("User registartaion Full", () => {
  before(() => {
    cy.visit(Cypress.env("baseURL"));
    cy.createJson(3);
  });

  //   it("Generate json by command", () => {
  //     cy.generateFixture(2);
  //   });
  // })

  //------------------------------------

  function createJson(x) {
    const faker = require("faker");

    cy.writeFile("cypress/fixtures/example.json", {
      hits: Cypress._.times(x, () => {
        return {
          first_name: `${faker.name.findName()}`,
          last_name: `${faker.name.lastName()}`,
          email: `${faker.internet.email()}`,
          address: `${faker.address.streetAddress()}`,
          phoneNumber: `${faker.datatype.number({
            min: 100000000,
            max: 999999999,
          })}`,
        };
      }),
    });
  }

  //------------------------------------

  it("Form 1 Registration", () => {
    cy.get(pe.registrationButton).click(),
      cy.get(pe.fullRegButton).should("have.class", "active"),
      cy.get(pe.accInfoButton).should("have.text", "ACCOUNT INFORMATION"),
      cy
        .get(pe.passwordInfo)
        .should(
          "have.text",
          " Lowercase letter is required Upper case letter is required Digit is not allowed Symbol is not allowed Maximum length is 16 Minimum length is 6"
        ),
      cy
        .get(pe.userName)
        .click()
        .should("be.visible")
        .type(ex["hits"][0]["first_name"])
        .should("have.value", ex["hits"][0]["first_name"]),
      cy
        .get(pe.email)
        .click()
        .should("be.visible")
        .type(userData["hits"][0]["email"])
        .should("have.value", userData["hits"][0]["email"]),
      cy
        .get(pe.password)
        .click()
        .should("be.visible")
        .type(password)
        .should("have.value", password),
      cy
        .get(pe.confirmPassword)
        .click({ multiple: true })
        .should("be.visible")
        .type(password, { multiple: true })
        .should("have.value", password),
      cy.get(pe.country).select(funcs.randomCountry()).should("not.be.empty"),
      cy.get(pe.nextButton).click();
  });

  it("Form 2 Registration", () => {
    cy.get(pe.accInfoButton).should("have.text", "PERSONAL DETAILS");
    cy
      .get(pe.firstName)
      .type(userData["hits"][1]["first_name"])
      .should("have.value", userData["hits"][1]["first_name"]),
      cy
        .get(pe.lastName)
        .type(userData["hits"][1]["last_name"])
        .should("have.value", userData["hits"][1]["last_name"]),
      cy.get(pe.birthDate).select(funcs.randomAge()).should("not.be.empty"),
      cy
        .get(pe.birthMonths)
        .select(funcs.randomMonths())
        .should("not.be.empty"),
      cy.get(pe.birthDay).select(funcs.randomDay()).should("not.be.empty"),
      cy.get(pe.gender).select(funcs.randomGender()).should("not.be.empty"),
      cy
        .get(pe.country)
        .select(funcs.randomCountrySecond())
        .should("not.be.empty"),
      cy.get(pe.city).select("Select City").should("not.be.empty"),
      cy.get(pe.nextButtonSecond).click();
  });

  it("Form 3 Registration", () => {
    cy.get(pe.accInfoButton).should("have.text", "CONTACT DETAILS");
    cy
      .get(pe.address)
      .click()
      .should("be.visible")
      .type(userData["hits"][1]["address"])
      .should("have.value", userData["hits"][1]["address"]),
      cy.get(pe.currency).select(funcs.randomCurrency()).should("not.be.empty"),
      cy.get(pe.countryCode).should("be.visible"),
      cy
        .get(pe.phoneNumber)
        .click()
        .type(JSON["hits"][0]["phoneNumber"])
        .should("be.visible"),
      cy.get(pe.checkbox).click().should("be.checked"),
      cy.get(".craft_btn").click(),
      cy
        .get(".title")
        .should(
          "have.text",
          "Congratulations, You have successfully registered!"
        );
  });
});

describe("User registartaion Quick Form first", () => {
  before(() => {
    cy.wait(5000);
    cy.visit(Cypress.env("baseURL"));
  });

  it("Email Registration Form", () => {
    cy.get(pe.registrationButton).wait(3000).click(),
      cy.get(pe.quickFormButton).click().should("not.have.class", "inactive"),
      cy
        .get(pe.emailQuick)
        .click()
        .type(userData["hits"][1]["email"])
        .should("have.value", userData["hits"][1]["email"]),
      cy.get(pe.currency).select(funcs.randomCurrency()).should("not.be.empty"),
      cy.get(pe.checkbox).click().should("be.checked"),
      cy.get(pe.registerButton).should("have.class", "active-item").click(),
      cy.get(pe.userProfile).click(),
      cy.get(pe.logoutButton).click();
  });
});

describe("User registartaion Quick second", () => {
  before(() => {
    cy.wait(5000);
    cy.visit(Cypress.env("baseURL"));
  });

  it("Phone Registration Form", () => {
    cy.get(pe.registrationButton, { timeout: 30000 }).click(),
      cy.get(pe.quickFormButton).should("not.have.class", "inactive").click(),
      cy.get(pe.phoneValue).select("Mobile").should("have.value", "Mobile"),
      cy.get(pe.countryCode).should("be.visible"),
      cy
        .get(pe.phoneNumber)
        .click()
        .type(userData["hits"][1]["phoneNumber"])
        .should("be.visible"),
      cy.get(pe.currency).select(funcs.randomCurrency()).should("not.be.empty"),
      cy.get(pe.checkbox).click().should("be.checked"),
      cy.get(pe.registerButton).should("have.class", "active-item").click();
  });
});

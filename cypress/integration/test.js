describe('Lesson 14 HW', () => {
    before (()=> {
    cy.visit('https://poppabet.com/sport/prematch')});

    it('Verification of the "Full Name" input text box.', () => {
      cy.get("#.mobile-header-section_topPanel_right > .signup-btn").click()

    });
});

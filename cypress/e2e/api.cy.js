describe("User registartaion Full", () => {
   it("GET", () =>{
       cy.request("GET", Cypress.env('baseURL')).then((response) => {
           expect(response).to.have.property('status', 200)
           expect(response.body).to.be.not.null
           expect(response.body).to.have.length(9450)
       })
   })
});


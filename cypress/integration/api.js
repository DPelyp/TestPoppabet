describe("User registartaion Full", () => {
   it("GET", () =>{
       cy.request("GET", Cypress.env('baseURL')).then((response) => {
           expect(response).to.have.property('status', 200)
           expect(response.body).to.be.not.null
           expect(response.body).to.have.length(9450)
       })
   })
});


describe("User registartaion Full", () => {
it("POST", () =>{
    const item = {
        id: 346346456457,
        name : "Sharik",
        status : "available"
    }
    cy.request({method: "POST", 
    url : "https://petstore.swagger.io/v2/pet", 
    body : item
}).then((response) => {
        expect(response).to.have.property('status', 200),
        expect(response.body).to.be.not.null,
        expect(response.body).to.eq({
            id: 346346456457, name: 'Sharik', photoUrls: Array(0), tags: Array(0), status: 'available'
        })
    })
})
})
/// <reference types="cypress"/>

describe('UI Automation - Service NSW Search Informations', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('https://www.service.nsw.gov.au/');
    cy.wait(5000);
  });

  it('Search Some Informations Number Plate', () => {
    // Search for informations topics & hit enter
    cy.get('input[placeholder="Search"]').eq(2).type('apply for a number plate{enter}').should('have.value', 'apply for a number plate');
    cy.wait(3000);
    cy.get('h2').contains('apply for a number plate').should('be.visible'); // Ensure open right page

    // Click Find Locations
    cy.get('li').contains('Find locations').click();
    cy.wait(3000);
    cy.get('h1[id="page-title"]').should('be.visible');
    cy.url().should('include', '/service-centre');

    // Get each data from data driven in json file
    cy.fixture('searchNSW').then((data) => {
      data.forEach((key) => {
        // Search NSW Location
        cy.get('input[id="locatorTextSearch"]').clear().type(`${key.suburbNSW}{enter}`).should('have.value', key.suburbNSW);
        cy.wait(3000);
        cy.get('a').contains(key.serviceCentre).should('be.visible');
      });
    });
  });
});

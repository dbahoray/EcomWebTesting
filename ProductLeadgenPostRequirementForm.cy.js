/// <reference types="Cypress" />
import 'cypress-file-upload'

describe('validate product home page',()=>{
    beforeEach('function', () =>{
        cy.on('uncaught:exception', (err, runnable) => {

            return false
        })
        cy.visit("https://mccoymart.com/product/")
    })
    it('validate post reqirement form', () =>{
        cy.get(".new_leadpopupButton").click()
        cy.get("#product_category").type("doors")
        cy.wait(2000)
        cy.get("div[class='searchResultContainer'] li:nth-child(6)").click()
        cy.get("#buyer_quantity").type("5")
        cy.get(".customDropdownText.selectedUnit").click()
        cy.get(".customDropdown.listingSelectoptionDropdown.show").contains('Sq. Meter').click()
        cy.get("#buyer_location").type("sarojini")
        cy.wait(2000)
        cy.get("div[class='addressSearchCnt'] li:nth-child(2)").should('be.visible').click()
        cy.wait(2000)
        cy.get("#contact_mobile").type("9873004039")
        cy.get("p[class='customInputMsg']").should('have.text','We will send an OTP on this number to verify')
        cy.get("button[class='formBtnOrange']").click()
        cy.get("#contact_name").should('not.have.value', '')
        cy.get("button[class='formBtnOrange nxt']").click()
        cy.xpath("(//div[@class='formWrapper'])[1]//label[4]").click()
        cy.wait(2000)
        cy.xpath("(//div[@class='formWrapper'])[2]//label[7]").click()
        cy.wait(2000)
        cy.xpath("(//div[@class='formWrapper'])[3]//label[3]").click()
        cy.wait(2000)
        cy.get(".thanks_title_sharing").should('have.text','Thanks for sharing your requirements!')
        cy.xpath("//button[normalize-space()='Got it!']").click()
    })
})
/// <reference types="Cypress" />

describe('MySecondTest', () => {
    it('Enter valid credentials', () =>{

        cy.on('uncaught:exception', (err, runnable) => {

            return false
        })

        cy.visit("https://mccoymart.com/")
        cy.get("#profile-menu-btn").click()
        cy.get("input[placeholder='Mobile Number']").type("9205489292")
        cy.get("button[class='blue-btn-global loginSignupBtnStep1']").click()
        cy.get("form[id='loginSignupFormStep2'] input[placeholder='Enter OTP']").type("8118")
        cy.get("button[class='blue-btn-global next-btn2']").click()

        let ExpectedName = "Hello Rahul Sahani,"

        cy.get("p[class='name']").then( (y) =>{

                                let ActualName = y.text()

                                //TDD Style
                                assert.equal(ActualName,ExpectedName)
        })
    })
    it('Enter invalid credentials', () => {

        cy.on('uncaught:exception', (err, runnable) => {

            return false
        })

        const mobileNumber = "990009"

        cy.visit("https://mccoymart.com/")
        cy.get("#profile-menu-btn").click()

        cy.get("input[placeholder='Mobile Number']").type(mobileNumber)
        cy.get("button[class='blue-btn-global loginSignupBtnStep1']").click()

        if(mobileNumber.length > 10){
            cy.get("span[class='errorMsg']").should('have.text', 'Phone must consist of maximum 10 digits')
        }
        else if(mobileNumber.length < 10){
            cy.get("span[class='errorMsg']").should('have.text', 'Phone must consist of at least 10 digits')
        }
        // else {
        //     cy.get("span[class='errorMsg']").should('not.exist')
        // }
    })
    it('Validate shop products', () => {
        cy.visit("https://mccoymart.com/")
        cy.get(".home-offering-card.home-shop-card.d-block").click()
        cy.url().should('eq','https://mccoymart.com/buy/')
        
        cy.xpath("//body[1]/section[2]/div[1]/div[2]/div[1]/div[1]/ul[1]/li[1]/div[1]/a")
        .then((b) => {

            let url = b.prop('href')
            cy.visit(url)
        })
        cy.url().should('include', 'https://mccoymart.com/buy/mccoy-8m-upvc-casement-door-handle-with-key-mccoy-cdhk-1-white/')
        cy.wait(3000)

        cy.go('back')
    })
    it('Validate footer links', () => {

        cy.visit("https://mccoymart.com/")
        const sections = ["//h3[normalize-space()='Shop Products']",
                          "//h3[normalize-space()='Find Professional']",
                          "//h3[normalize-space()='Buy Leads']",
                          "//h3[normalize-space()='Company']"
                         ]
        sections.forEach((section) => {
            cy.xpath(section).should('be.visible').click()
            cy.wait(4000)
        })
        // cy.xpath("//h3[normalize-space()='Shop Products']").click()
        // cy.xpath("//h3[normalize-space()='Find Professional']").click()
        // cy.xpath("//h3[normalize-space()='Buy Leads']").click()
        // cy.xpath("//h3[normalize-space()='Company']").click()
        // cy.wait(5000)
    })
    it('Validate Shop Products links', () => {

        cy.visit("https://mccoymart.com/")

        cy.xpath("(//ul[@class='about_company'])[1]//li").should('have.length', '9')
        cy.xpath("(//ul[@class='about_company'])[1]//li").each(($el, index, $list) => {

            cy.wrap($el).click()
            cy.wait(5000)
        })
    })
    it('Validate Find professional links', () => {

        cy.visit("https://mccoymart.com/")

        cy.xpath("//div[@class='details_about_company_foot ']//div[2]//li").should('have.length', '8')
        cy.xpath("//a[@target='_blank'][normalize-space()='Consultants']").click()
        cy.xpath("//a[@target='_blank'][normalize-space()='Contractors']").click()
        cy.xpath("//div[@class='details_about_company_foot ']//div[2]//li")
        .each(($el,index,$list) => {
            cy.wrap($el).should('be.visible').click()
            cy.wait(3000)
        })
        cy.xpath("//a[@target='_blank'][normalize-space()='Handyman']").click()
    })
    it('Validate Buy Leads links', () => {

        cy.visit("https://mccoymart.com/")

        cy.xpath("(//div[@class='about_company-wrapper'])[3]//li").should('have.length', '10')
        cy.xpath("(//ul[@class='about_company'])[3]//li").each(($el,index,$list) => {

            if(index < 10){
                cy.log('Clicking link:', $el.text())
                cy.xpath("(//ul[@class='about_company'])[3]//li").eq(index).should('be.visible')
                .find('a')
                .invoke('attr', 'href')
                .then((href) => {

                    if(href){
                        cy.window().then((win) => {
                            win.open(href, '_blank')
                        })
                        cy.wait(3000)
                       // cy.visit(href)
                       // cy.go('back')
                    }
                })
            }
        })
    })
    it('Validate Company links', () => {

        cy.visit("https://mccoymart.com/")

        cy.xpath("//div[@class='details_about_company_foot ']//div[4]//li").should('have.length', '10')
        .each(($el,index,$list) => {

            if(index < 10){
                cy.log('Clicking link:', $el.text())
                cy.xpath("(//div[@class='about_company-wrapper'])[4]//li").eq(index).should('be.visible')
                .find('a')
                .invoke('attr','href')
                .then((href) => {
                    if(href){
                        cy.window().then((win) => {
                            win.open(href, '_blank')
                        })
                        // cy.visit(href)
                        // cy.go('back')
                        cy.wait(3000)
                    }
                    else{
                        cy.log('No href found for element at index', index)
                    }
                })
            }
        })
    })
    it('Click on Bulk Orders', () =>{
        cy.visit("https://mccoymart.com/")
        cy.xpath("//a[normalize-space()='Bulk Orders']").click()

        let EName = "Get a Quote instantly"
        cy.xpath("//h2[normalize-space()='Get a Quote instantly']").then( (z) => {
                                                 
                                                let AName = z.text()

                                                //TDD Style
                                                assert.equal(AName,EName)
        })
        cy.get("input[placeholder='Search Product or Category']").type("door")
        cy.wait(3000)
        cy.get(".category-list").contains('Door Aldrop').click()
        // cy.xpath("//ul[@class='category-list']//li[@data-id='139']").should('be.visible')
        // .and('exist').click()
        cy.get("input[placeholder='Qty']").type("2")
        cy.get("button[class='next rfq-next-btn step1Btn']").click()
        cy.xpath("//input[@id='quote_location']").type("508213")
        cy.wait(3000)
        cy.xpath("//ul[@class='location-quotes-dropdown-inner']//li").click()
        cy.get("button[class='next rfq-btn-str rfq-next-btn step7Btn']").click()

        cy.get("input[placeholder='Mobile Number']").type("9205489292")
        cy.xpath("//button[normalize-space()='Send OTP']").click()
        cy.get("input[placeholder='Enter verification code']").type("8118")
        cy.xpath("//button[normalize-space()='Verify']").click()
        cy.wait(3000)

        let ename1 = "Thank you"
        cy.get(".thank-you-msg").then( (x1) => {

                            let aname1 = x1.text()

                            //BDD Style
                            expect(aname1).to.equal(ename1)
        })
        cy.xpath("//a[normalize-space()='Go to My RFQ & Quotes']").click()
        cy.wait(2000)

        let ename2 = "RFQ & Quotes"
        cy.xpath("//h4[normalize-space()='RFQ & Quotes']").then( (x2) => {

                                  let aname2 = x2.text()

                                  //BDD Style
                                  expect(aname2).to.equal(ename2)
        })
    })
})

/// <reference types="cypress" />
import Login from "./pageObject/Login/Login"
import Register from "./pageObject/Registeration/Register"
import Product from "./pageObject/Product/product"
import Cart from "./pageObject/Cart/Cart";
describe('Icraft shop Project', () => {
            let datas;
            let infos ="This email is already registered!!!";
            

            before(() => {
            
            cy.fixture("icraftshopdata").then(function(data) {
                datas = data
                return datas
            }) 
            })
            
        //===---------------------------------------------------==
        //===                    code                      ==
        //===---------------------------------------------------==

            it("Registration Page",()=>{
                cy.visit("http://shop.icraftsoft.net:8095/");

                const reg= new Register()
                reg.registerButton()
                    .should('have.attr', 'value', 'Register')
                    .and('have.attr', 'type', 'submit')
                    .click()
                cy.wait(2000)
                reg.usernames()
                   .type(datas.name)
                   .should('have.value',datas.name)

                reg.emails()
                   .type(datas.email)
                   .should('have.value',datas.email)
                   

                reg.submitButton()
                   .should('have.attr', 'value', 'Register') 
                   .and('have.attr', 'type', 'submit')
                   .click()

                 cy.wait(3000) 
                 //cy.get(':nth-child(3) > :nth-child(3)').should('have.text','This email is already registered!!!\n')
               /*  if(texts=="This email is already registered!!!"){
                    console.log("You already registered. please use the number of four digit to login")
                }  */


                reg.info()
                .invoke('text')
                .should((text2) => {
                  expect(infos).not.to.eq(text2)
                })
            })

            it("Login And Add Product to Cart then order it",()=>{
                cy.visit("http://shop.icraftsoft.net:8095/");

                const logs= new Login()
                const pr = new Product()
                const cr = new Cart()

                logs.logins()
                    .should('have.attr', 'name', 'userid')
                    .and('have.attr', 'type', 'number')
                cy.wait(2000)
                logs.logins().type(datas.loginID)
                logs.loginButton().click()


                cy.wait(2000)
                cy.get('#myTable_filter > label > .form-control').type('DELL')
                cy.wait(2000) 
                cy.selectProduct("FZA")
               
               // calls product click
               //pr.products()
                for (let index = 0; index < datas.productName.length; index++) {
                    cy.selectProduct(datas.productName[index])
                  
                }

                // we check our cart and order the product
                cr.carts();
            })


        
   })
 
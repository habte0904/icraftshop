class Login {

    logins(){
        return cy.get('.form-control');  
    }
    
    loginButton(){
        return cy.get('.login-form-1 > form > [style="padding-left: 185px;"] > .btnSubmit');
    }
}
export default Login;
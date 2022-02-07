class Product{

    products(){
        let datas;
        cy.fixture("icraftshopdata").then(function(data) {
            datas = data
            return datas
           }) 

        for (let index = 0; index < datas.productName.length; index++) {
        cy.selectProduct(datas.productName[index])
        }
    }
}
export default Product;

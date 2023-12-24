module.exports=(temp,product)=>{
    let output=temp.replace(/{%PRODUCTNAME%}/g, product.productName)  //here it will make it global so that all the place holder will be replaced.
        output=output.replace(/{%IMAGE%}/g, product.image)  //here it will make it global so that all the place holder will be replaced.
        output=output.replace(/{%PRICE%}/g, product.price)  //here it will make it global so that all the place holder will be replaced.
        output=output.replace(/{%FROM%}/g, product.from)  //here it will make it global so that all the place holder will be replaced.
        output=output.replace(/{%NUTRIENTS%}/g, product.nutrients)  //here it will make it global so that all the place holder will be replaced.
        output=output.replace(/{%QUANTITY%}/g, product.quantity)  //here it will make it global so that all the place holder will be replaced.
        output=output.replace(/{%DESCRIPTION%}/g, product.description)  //here it will make it global so that all the place holder will be replaced.
        output=output.replace(/{%ID%}/g, product.id)  //here it will make it global so that all the place holder will be replaced.

        if(!product.organic)
        {
        output=output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')  //here it will make it global so that all the place holder will be replaced.
        }
        return output;
}
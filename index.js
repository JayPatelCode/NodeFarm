const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');
/////////////////////////////////
//Files//
//Synchronous: it blocks execution
// const textIn=fs.readFileSync('./txt/input.txt','utf-8')
// console.log(textIn);

// const textOut=` This is what we know about avovado ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log("file written");


//Asynchronous it does not blocks execution here first clg will print and then when call back function is executed then its file will be printed.

// fs.readFile('./txt/input.txt','utf8',(err,data)=>{


//     console.log(data);
// })
// console.log('Reading file');



// fs.readFile('./txt/start.txt','utf-8',(err,data)=>{

//     console.log(data);
// })
// console.log('Reading File');



// fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
//    if(err)return console.log('Error No file exists')
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`,'utf-8',(err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n ${data3}`,'utf-8', err=>{
//                 console.log("Your file has been written ");

//             })

//         });

//     });
// });
// console.log('Reading File');

/////////////////////////////////////////////////
// SERVER //

const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8')//it will read file in the beggining and when it is called it will write it 
const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8')//it will read file in the beggining and when it is called it will write it 
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8')//it will read file in the beggining and when it is called it will write it 

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')//it will read file in the beggining and when it is called it will write it 
const dataObj= JSON.parse(data)

const slugs=dataObj.map(el=>slugify(el.productName,{lower:true}))
console.log(slugs)

//creating server
const server = http.createServer((req, res) => {
    // console.log(req.url);
    // console.log(url.parse(req.url,true));//parse is used to parse variable from URL.
    const {query,pathname}= url.parse(req.url,true);

    //Overview page
    if(pathname==='/' || pathname==='/overview')
    {  res.writeHead('200',{'Content-type':'text/html'})

        const cardsHtml=dataObj.map(el=>replaceTemplate(tempCard,el)).join('')
        // console.log(cardsHtml)
        const output=tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
      res.end(output)
      
    }
    //Product page
    else if(pathname==='/product')
    {
    // console.log(query)
        res.writeHead('200',{'content-type':'text/html'})
        const product=dataObj[query.id]
        const output=replaceTemplate(tempProduct,product)
        res.end(output)
    }
    //API
    else if(pathname==='/api')
    {
    // fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err,data)=>{

    //    const productData= JSON.parse(data)     //this will take json code which is in form of string and convert it in javascript(int his case javascript array or object).
    // // //   console.log(productData)
       res.writeHead(200,
        {'Content-type':'application/json'})
       res.end(data) 
    }

    else
    {
    res.writeHead(404,{
        'Content-type':'text/html',
        'my-own-header':'hello-world'
    })
    res.end('<h1>This page could not be found</h1>')
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})


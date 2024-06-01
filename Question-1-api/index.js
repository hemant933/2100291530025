const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express();

const generateProductIds = (products) => {
    return products.map(product => ({
        ...product,
        uniqueId: uuidv4()
    }));
};


app.get('/categories/:categoryname/product', (req, res) => {
    const category = req.params.categoryname;
    const n = parseInt(req.query.n) || 5;
    const page = parseInt(req.query.page) || 1;
    const sortBy = req.query.sortBy;
    const order = req.query.order === 'desc' ? -1 : 1;

  
    let filteredProducts = products.filter(product => product.category === category);


    if (sortBy) {
        filteredProducts.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1) * order);
    }

   
    const startInd = (page - 1) * n;
    const endInd = page * n;
    const pagiPro = filteredProducts.slice(startInd, endInd);

   
    const productsWithIds = generateProductIds(pagiPro);

    res.json(productsWithIds);
});

app.get('/categories/:categoryname/product/:productid', (req, res) => {
    const category = req.params.categoryname;
    const productId = req.params.productid;

    
    const product = products.filter(product => product.category === category)
                            .find(product => product.uniqueId === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.listen(3000,'20.244.56.144',()=>{
    console.log('Server is running on port 3000');
})
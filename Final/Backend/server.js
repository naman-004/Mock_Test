const express = require('express');
const app = express();
const {pool}=require('./database')
const cors=require("cors");
app.use(cors())
app.use(express.json())

app.post('/product/create', (req, res) => {
    const { prodName,cost,description,isactive,ProdCat} = req.body;
    console.log(ProdCat)
    let filteredProdCat='{"'
    if(ProdCat.length===1){
        filteredProdCat=`{"${ProdCat[0]}"}`
    }
    else{
        filteredProdCat+=ProdCat[0]
        
        for(let i=1;i<ProdCat.length;i++){
            filteredProdCat+='","'
            filteredProdCat+=ProdCat[i]
        }
        filteredProdCat+='"}'
    }

    pool.query(
      `INSERT INTO product ( prodname,cost,description,isactive,ProdCat) VALUES ($1,$2,$3,$4,'${filteredProdCat}') RETURNING * `,
      [ prodName,cost,description,isactive],
      (err, result) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.status(200).json({
          msg: "Product is created",
          data: result.rows[0],
        });
      }
    );
  }
  );

app.get('/product/read', (req,res) => {
    pool.query('SELECT * FROM product', (err,result) =>{
        if(err){
            throw err
        }
        res.json({
            data : result.rows
        })
    })
} )

app.post("/UpdateProduct/:id", (req,res) => {
    
    let id = parseInt(req.params.id)
    const { ColName,ColV } = req.body
    if(ColName==='ProdCat'){
    let filteredProdCat='{"'
    if(ColV.length===1){
        filteredProdCat=`{"${ColV[0]}"}`
    }
    else{
        filteredProdCat+=ColV[0]
        for(let i=1;i<ColV.length;i++){
            filteredProdCat+='","'
            filteredProdCat+=ColV[i]
        }
        filteredProdCat+='"}'
    } 
    console.log(`UPDATE product  SET `+ColName+` = '`+filteredProdCat+`' WHERE id=${id}`)
    pool.query(`UPDATE product  SET `+ColName+` = '`+filteredProdCat+`' WHERE id=${id}`, (err,result) => {
        if(err){
            throw err
        }
        res.json({
            data : "product is updated"
        })
    })}
    else{
            pool.query(`UPDATE product  SET `+ColName+` = '`+ColV+`' WHERE id=${id}`, (err,result) => {
        if(err){
            throw err
        }
        res.json({
            data : "product is updated"
        })
    })}
})

app.delete("/DeleteProduct/:id", (req,res) => {
    const id = parseInt(req.params.id)

    pool.query(`DELETE FROM product WHERE id=${id}`, (err,result) => {
        if(err){
            throw err
        }
        res.json({
            msg: `product is deleted`
        })
    })
})
 
app.post('/CreateCategory',(req, res) => {
    const {name, description ,isactive} = req.body;
    pool.query(
      "INSERT INTO category (name, description ,isactive) VALUES ($1,$2,$3) RETURNING * ",
      [name, description ,isactive],
      (err, result) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.status(200).json({
          msg: "Category is created",
          data: result.rows[0],
        });
      }
    );
  }
  )

app.get('/category/read',  (req,res) => {
    pool.query('SELECT * FROM category', (err,result) =>{
        if(err){
            throw err
        }
        res.json({
            data : result.rows
        })
    })
})
app.post("/UpdateCategory/:id", (req,res) => {
    let id = parseInt(req.params.id)
    const { ColName,V }  = req.body
    pool.query(`UPDATE category  SET `+ColName+` = '`+V+`' WHERE id=${id}`, (err,result) => {
        if(err){
            throw err
        }
        res.json({
            data : "Category is updated"
        })
    })
})
app.delete("/DeleteCategory/:id",  (req,res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM product', (err,result) =>{
        if(err){
            throw err
        }
        cat = result.rows
        let category = []
        cat.map((d)=>{
        category=d.prodcat
        console.log(d,category,id)
        if(category.length>0){
            if(category.includes(id)){
                let filteredProdCat='{"'
                if(category.length===1){
                    filteredProdCat=`{"${category[0]}"}`
                }
                else{
                    filteredProdCat+=category[0]
                    for(let i=1;i<category.length;i++){
                        if(!(category[i]===id)){
                        filteredProdCat+='","'
                        filteredProdCat+=category[i]
                        }
                    }
                    filteredProdCat+='"}'
                }
                pool.query(`UPDATE product SET ProdCat='${filteredProdCat}' WHERE id=${d.id}`, (err,result) => {
                    if(err){
                        throw err
                    }
                })
                }
                
            }  
            
        })
        pool.query(`DELETE FROM category WHERE id=${id}`, (err,result) => {
            if(err){
                throw err
            }
            res.json({
                msg: `Category Deleted successfuly`
            })
        })
    })
    // pool.query(`DELETE FROM category WHERE id=${id}`, (err,result) => {
    //     if(err){
    //         throw err
    //     }
    //     res.json({
    //         msg: `Category is deleted`
    //     })
    // })
})


app.listen(3001, ()=>console.log('app listening on port 3001'));
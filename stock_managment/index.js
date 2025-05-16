const express = require('express');
var methodOverride = require('method-override')
const connection=require('./public/js/connection');
const path = require('path');
let activityObject=require('./public/js/data');
const { createSecretKey } = require('crypto');
const app = express();
const port=3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public' )));

app.use(methodOverride('_method'))
app.get('/', (req, res) => {
  
try{
let query='select * from products'
connection.query(query,(err,result)=>{
    if(err){
        throw(err);
    }
   
res.render('home.ejs',{result})
  
 console.log(result);   
})
}
catch(err){
    console.log(err);
}

});


app.get('/products',(req,res)=>{
res.render('products.ejs')
})


app.post('/products',(req,res)=>{
let{id,name,supplier,price,category,expiry,quantity}=req.body;

let query=`insert into products values(?,?,?,?,?,?,?)`;
let data=[id,name,supplier,price,category,expiry,quantity]
connection.query(query,data,(err,result)=>{
 
})
let query2=`insert into notifications values(?)`;
  let date=new Date().toLocaleDateString();
let data2=[`Product ${data[1]} Added at ${date}`]
connection.query(query2,data2,(err,result)=>{
   
    res.redirect('/')
})


})





app.get('/dashboard',(req,res)=>{
    let query=`select * from products`;
  connection.query(query,(err,result)=>{
    if (result.length > 0) {
        
      res.render('dashboard.ejs', { result });
    } else {
  
      res.render("empDash.ejs");
    }
  
})
})

app.get('/aboutus',(req,res)=>{
   
    res.render('aboutus.ejs')
  
})

app.post('/category', (req, res) => {

  const selectedCategory = req.body.category;
  if(selectedCategory=='*'){
    res.redirect('/dashboard')
  }else{
     let query=`SELECT * FROM  products where category='${selectedCategory}'`
connection.query(query,(err,result)=>{
 
    res.render('record.ejs',{result})
})
  }
 
 
});


app.post('/dashboard', (req, res) => {
   let { newID } = req.body;
   let query=`select * from products where id=${newID}`
   connection.query(query,(err,result)=>{
   let data=result[0];


    res.render('details.ejs',{data});
   })

});



app.post('/delete',(req,res)=>{ 
    let { newID,newName } = req.body;

   
    let query=`delete from products where id=${newID}`;
    connection.query(query,(err,result)=>{})

   let query2=`insert into notifications values(?)`;
   let date=new Date().toLocaleDateString();
  
let data2=[`Product ${newName} Removed at ${date}`];
connection.query(query2,data2,(err,result)=>{
    res.redirect('/dashboard')
})

}) 
app.post('/delete',(req,res)=>{ 
res.send('ok');
})





app.post('/edit',(req,res)=>{
     let  {newID}  = req.body;
     
       let query=`select * from products where id=${newID}`
   connection.query(query,(err,result)=>{
   let data=result[0];


const expiryDate = new Date(data.expiry);
const formattedDate = expiryDate.toISOString().split('T')[0]; // YYYY-MM-DD




    res.render('edit.ejs',{data,formattedDate});
   })
})



app.post('/edits',(req,res)=>{
    let{name,id,category,price,quantity,supplier,expiry}=req.body;

      let query=`update products
    set supplier='${supplier}',
    price=${price},
category='${category}',
quantity=${quantity},
expiry='${expiry}'
where id=${id}`;

connection.query(query,(err,result)=>{})
 let query2=`insert into notifications values(?)`;
   let date=new Date().toLocaleDateString();
  
let data2=[`Product ${name}  edit at ${date} `];
connection.query(query2,data2,(err,result)=>{
res.redirect('/dashboard')
})

})

app.get('/activity',(req,res)=>{
    let query=`select * from notifications`
    connection.query(query,(err,result)=>{
        console.log(result);
res.render('activity.ejs',{result});
    })
    
})


app.get('/expiry',(req,res)=>{
    let query=`select name,price,expiry from products`
    connection.query( query,(err,result)=>{
         res.render('expiry.ejs',{result})
    })
   
})

app.listen(port, () => {
console.log('App listening on port');
});
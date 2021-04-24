const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'/views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

var cmnts = [
    {
        id: 0,
        name: "Doraemon",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, placeat. Ipsum harum sed laborum aperiam accusantium quidem quasi. Culpa nemo totam quasi dolorem excepturi voluptate sunt cupiditate nobis blanditiis itaque."
    },
    {
        id: 1,
        name: "Ninja Hattori",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, placeat. Ipsum harum sed laborum aperiam accusantium quidem quasi. Culpa nemo totam quasi dolorem excepturi voluptate sunt cupiditate nobis blanditiis itaque."
    },
    {
        id: 2,
        name: "Shizuka",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, placeat. Ipsum harum sed laborum aperiam accusantium quidem quasi. Culpa nemo totam quasi dolorem excepturi voluptate sunt cupiditate nobis blanditiis itaque."
    },
    {
        id: 3,
        name: "Shinchan",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, placeat. Ipsum harum sed laborum aperiam accusantium quidem quasi. Culpa nemo totam quasi dolorem excepturi voluptate sunt cupiditate nobis blanditiis itaque."
    }
]

// show comments
app.get('/', (req, res)=>{
    res.render('comments/index', {cmnts});
})

// Add new comment
app.get('/comments/new',(req, res)=>{
    res.render('comments/new');
})

app.post('/comments/new', (req, res)=>{
    const id= cmnts.length;
    const {name, text}= req.body;
    cmnts.push({id, name, text});
    // console.log(cmnts);
    // console.log(req.body);
    res.redirect('/');
})

// Show specific comment
app.get('/comments/:id', (req, res)=>{
    const {id} = req.params;
    const found =cmnts.find(c=>c.id===parseInt(id));
    // res.send(found);
    res.render('comments/show',{comment: found});
})

// Edit any comment
app.get('/comments/:id/edit',(req, res)=>{
    const {id} = req.params;
    const found =cmnts.find(c=>c.id===parseInt(id));
    // res.send(found);
    res.render('comments/edit',{comment: found});
})

app.patch('/comments/:id',(req,res)=>{
    const {id}= req.params;
    const found =cmnts.find(c=>c.id===parseInt(id));
    const updatedText = req.body.text;
    
    found.text = updatedText;
    // console.log(updatedText);
    // res.send("patch route")
    res.redirect('/');
})


// Delete a comment
app.delete('/comments/:id', (req, res)=>{
    const {id} = req.params;
    const temp = cmnts.filter(c=>c.id!==parseInt(id));
    
    cmnts = temp;
    res.redirect('/');
})

app.listen(3000, ()=>{
    console.log("Server Connected");
})
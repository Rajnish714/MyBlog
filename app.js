
const express = require("express")
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const _ = require("lodash")

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const postS = []

const homeContent = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum since the 1500s, when an unknown printer took a type specimen book. It has galley of type and scrambled it to make a type specimen book. It has survived not onlhas been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a ecently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const aboutContent = "is so make a type specimen book. It has survived not o the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
const contactContent = "pe specimen book. It has survived not o the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960spe specimen book. It has survived not o the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s"




app.get("/", (req, res) => {

    res.render('home', { navlist: "Home page", pGraph: homeContent, posts: postS })
})
app.get("/about", (req, res) => {

    res.render('contact', { navlist: "Contact", pGraph: aboutContent })
})

app.get("/contact", (req, res) => {

    res.render('about', { navlist: "About", pGraph: contactContent })
})

app.get("/compose", (req, res) => {
    res.render('compose')

})

app.post("/compose", (req, res) => {
    let post = {
        title: req.body.title,
        content: req.body.item
    }
    postS.push(post)
    res.redirect("/")

})



app.get("/posts/:postTitle", (req, res) => {

    const requestTitle = _.lowerCase(req.params.postTitle);

    postS.forEach(post => {
        const storeString = _.lowerCase(post.title)
        if (storeString === requestTitle) {
            res.render("post", {
                title: post.title,
                content: post.content
            })

        }
        else {
            res.redirect("/")
        }
    })



})

app.listen(process.env.PORT || 3000, () => {
    console.log("server has started")
})
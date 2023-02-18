const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const _ = require("lodash");
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/blogpost");
const postS = [];

const homeContent =
  "is simply dummy text of the printing and typesetting industry. Lorem Ipsum since the 1500s, when an unknown printer took a type specimen book. It has galley of type and scrambled it to make a type specimen book. It has survived not onlhas been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a ecently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const aboutContent =
  "is so make a type specimen book. It has survived not o the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const contactContent =
  "pe specimen book. It has survived not o the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960spe specimen book. It has survived not o the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s";

const itemSchema = {
  title: String,
  content: String,
};

const PostData = mongoose.model("item", itemSchema);

app.get("/", (req, res) => {
  PostData.find({}, (err, foundItem) => {
    res.render("home", {
      navlist: "Home page",
      pGraph: homeContent,
      posts: foundItem,
    });
  });
});

app.get("/about", (req, res) => {
  res.render("contact", { navlist: "Contact", pGraph: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("about", { navlist: "About", pGraph: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const item = new PostData({
    title: req.body.title,
    content: req.body.item,
  });
  PostData.insertMany(item, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data inserted successfully");
    }
  });

  res.redirect("/");
});

app.get("/posts/:postTitle", (req, res) => {
  const requestTitle = req.params.postTitle;

  PostData.findOne({ _id: requestTitle }, (err, foundItem) => {
    res.render("post", {
      title: foundItem.title,
      content: foundItem.content,
    });
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("server has started");
});

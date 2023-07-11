exports.get404 = (req, res) => {
  res.render("404", { pageTitle: "Error Page", path: "/404" });
  //res.status(404).sendFile(path.join(__dirname, "views", "404.html")); //adding an error page, no '../' since we are already in the project folder
};

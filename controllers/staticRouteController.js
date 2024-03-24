import db from "../postgressSetup.js";

async function handelHomeRoute(req, res) {
  try {
    const response = await db.query("SELECT * from blogs");
    res.render("home.ejs", { user: req.user,blogs: response.rows });
  } catch (error) {
    console.log("error in homeController:"+error)
  }
}

export { handelHomeRoute };

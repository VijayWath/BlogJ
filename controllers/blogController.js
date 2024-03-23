import db from "../postgressSetup.js"

async function handleAddBlog(req,res){
  const title = req.body.title
  const body = req.body.body
  const ImagePath = req.file.path

  try {
    db.query("INSERT INTO blogs(title,body,coverImageUrl,createdByMail) VALUES($1,$2,$3,$4)",[title,body,ImagePath,req.user.email])
  } catch (error) {
    console.log("error While inserting blog data:"+error)
  }
  return res.redirect("/")
}

export {handleAddBlog}
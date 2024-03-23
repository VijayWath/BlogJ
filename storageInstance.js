import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const finalName = `${Date.now()}-${req.user.id}-${req.user.email}-${file.originalname}`
      cb(null,finalName)
    }
  })
  
  const upload = multer({ storage: storage })

  export default upload
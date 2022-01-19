import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === 'report') cb(null, 'uploads/reports/')
    else cb(null, 'uploads/images/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  let filetypes = /jpg|jpeg|png/
  if (file.fieldname === 'report') filetypes = /pdf/

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Invalid file format!')
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/image', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

router.post('/report', upload.single('report'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router

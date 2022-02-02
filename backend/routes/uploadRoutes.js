import path from 'path'
import express from 'express'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
const router = express.Router()
import cloudinary from '../utils/cloudinary.js'

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const uniqueFileName = `${file.fieldname}-${Date.now()}`
    return {
      folder:
        file.fieldname == 'image'
          ? 'health-dock/images'
          : 'health-dock/reports',
      format: 'png',
      public_id: uniqueFileName,
    }
  },
})

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/

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
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  },
})

router.post('/image', upload.single('image'), async (req, res) => {
  res.send(`${req.file.path}`)
})

router.post('/report', upload.single('report'), (req, res) => {
  res.send(`${req.file.path}`)
})

export default router

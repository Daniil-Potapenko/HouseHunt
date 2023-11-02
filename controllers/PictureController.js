import multer from 'multer';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({storage: storage});

export const returnPathOfImage = (req, res) => {
  try {
    console.log(req.file);
    res.json({
      'path': `${process.env.FULL_HOST}/${req.file.path}`,
    });
  } catch (e) {
    res.status(500).json({
      'success': 'false',
      'message': 'Server error, pls try later',
    });
    console.log(e);
  }
};



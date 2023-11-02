import ContentModel from '../models/Content.js';


export const createContent = async (req, res) => {
  try {
    const pictureExist = req.body.picture ? true : false;
    const content = new ContentModel({
      type: req.body.type,
      summary: req.body.summary,
      description: req.body.description,
    });

    if (pictureExist) {
      content.picture = req.body.picture;
    }

    content.save().then(async () => {
      res.status(200).json({
        status: 'success',
        contentID: content.id,
      });
    });
  } catch (e) {
    res.status(500).json({
      'success': 'false',
      'message': 'Error, pls try later',
    });
    console.log(e);
  }
};

export const findContent = async (req, res) => {
  try {
    let contentId;
    let conntentType;
  } catch (e) {
    res.status(500).json({
      'success': 'false',
      'message': 'Error, pls try later',
    });
    console.log(e);
  }
};


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
    const contentId = req.query.id;
    const conntentType = req.query.type;
    let content;

    contentId ?
      content = await ContentModel.findById(contentId) :
    conntentType ?
      content = await ContentModel.find({type: conntentType}) : {};

    if (!content) {
      res.status(404).json({'message': 'Error, content not found'});
    } else {
      res.status(200).json(content);
    }
  } catch (e) {
    res.status(500).json({
      'success': 'false',
      'message': 'Error, pls try later',
    });
    console.log(e);
  }
};

export const deleteContent = async (req, res) => {
  try {
    const contentId = req.query.id;
    const content = await ContentModel.findByIdAndDelete(contentId);

    if (!content) {
      res.status(404).json({'message': 'Error, content not found'});
    } else {
      res.status(200).json({status: 'success'});
    }
  } catch (e) {
    res.status(500).json({
      'success': 'false',
      'message': 'Error, pls try later',
    });
    console.log(e);
  }
};

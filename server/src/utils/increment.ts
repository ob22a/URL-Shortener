import UrlModel from '../model/urlModel.js';

const incrementClickCount = (shortCode: string) => {
  UrlModel.updateOne(
    { shortCode },
    { $inc: { clickCount: 1 } }
  ).exec();
};
export default incrementClickCount;
const utils = require('./utils');
const INDUSTRY_IDS = require('./INDUSTRY_IDS');
const ObjectId = require('mongodb').ObjectId;
const RESULTS_PER_PAGE = 5;

let add = async (req, db) => {
  if(!req.session.userId) return {error:'Użytkownik nie jest zalogowany', errorCode: 1};
  let data = req.body;
  let validationInfo = validateAndNormalize(data);
  if(validationInfo.error) return validationInfo;
  data.userId = req.session.userId;
  data.timeStamp = utils.getTimeStamp();
  let insertion = await db.collection('offers').insertOne(data);
  return {offerId:insertion.insertedId};
};

let getById = async (offerId, db) => {
  if(!ObjectId.isValid(offerId)) return {error: 'To ogłoszenie nie istnieje'}
  let data = await db.collection('offers').findOne({_id: ObjectId(offerId)});
  if (!data) return {error: 'To ogłoszenie nie istnieje'};
  let user = await db.collection('users').findOne({_id: ObjectId(data.userId)});
  data.username = user.username;
  data.industry = INDUSTRY_IDS[data.industry];
  return {data};
};

let getByUserId = async (userId, db) => {
  let offers = await db.collection('offers').find({userId});
  offers = await offers.toArray();
  for(offer of offers) offer.industry = INDUSTRY_IDS[offer.industry];
  return offers;
};

let getAll = async (db, filters) => {
  let offers = await db.collection('offers').find(filters);
  offers = await offers.toArray();
  for(offer of offers) offer.industry = INDUSTRY_IDS[offer.industry];
  return offers;
};

let getByPageNumber = async (pageNumber, db) => {
  let from = (pageNumber-1)*RESULTS_PER_PAGE;

};

let removeById = async (offerId, db) => {
  await db.collection('offers').deleteOne({_id: ObjectId(offerId)});
};

let update = async (offer, db) => {
  let validationInfo = validateAndNormalize(data);
  if(validationInfo.error) return {error: validationInfo};
  let idToUpdate = offer._id;
  delete offer._id;
  await db.collection('offers').updateOne({_id: ObjectId(idToUpdate)}, {$set: offer});
};

let validateAndNormalize = (data) => {
  if(!data.title || !data.description || !data.city || !data.email)
    return {error: 'Nie udało się dodać ogłoszenia', errorCode: 2};
  data.city = data.city.toLowerCase();
  data.city = data.city.charAt(0).toUpperCase() + data.city.slice(1);
  //TODO finish this function
  return {}
}

module.exports = {add, getById, getByUserId, getAll, removeById, update};

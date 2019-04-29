const ObjectId = require('mongodb').ObjectId;
const RESULTS_PER_PAGE = 5;

let add = async (req, db) => {
  if(!req.session.userId) return {error:'Użytkownik nie jest zalogowany', errorCode: 1};
  // TODO validate and normalize data
  let data = req.body;
  if(!data.title || !data.description || !data.city || !data.email)
    return {error: 'Nie udało się dodać ogłoszenia', errorCode: 2};
  data.userId = req.session.userId;
  let insertion = await db.collection('offers').insertOne(data);
  return {offerId:insertion.insertedId};
};

let getById = async (offerId, db) => {
  if(!ObjectId.isValid(offerId)) return {error: 'To ogłoszenie nie istnieje'}
  let data = await db.collection('offers').findOne({_id: ObjectId(offerId)});
  if (!data) return {error: 'To ogłoszenie nie istnieje'};
  let user = await db.collection('users').findOne({_id: ObjectId(data.userId)});
  data.username = user.username;
  return {data};
};

let getByUserId = async (userId, db) => {
  let offers = await db.collection('offers').find({userId});
  return offers.toArray();
};

let getAll = async (db) => {
  let offers = await db.collection('offers').find();
  return offers.toArray();
};

let getByPageNumber = async (pageNumber, db) => {
  let from = (pageNumber-1)*RESULTS_PER_PAGE;

};

let removeById = async (offerId, db) => {
  await db.collection('offers').deleteOne({_id: ObjectId(offerId)});
};

let update = async (offer, db) => {
  let idToUpdate = offer._id;
  delete offer._id;
  await db.collection('offers').updateOne({_id: ObjectId(idToUpdate)}, {$set: offer});
};

module.exports = {add, getById, getByUserId, getAll, removeById, update};

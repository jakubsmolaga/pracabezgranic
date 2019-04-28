const ObjectId = require('mongodb').ObjectId;

let add = async (req, db) => {
  if(!req.session.userId) return {error:'user not logged in'};
  // TODO validate and normalize data
  let data = req.body;
  let insertion = await db.collection('offers').insertOne({
    title: data.title,
    description: data.description,
    city: data.city,
    street: data.street,
    number: data.number,
    blind: data.blind,
    deaf: data.deaf,
    wheelchair: data.wheelchair,
    upperbody: data.upperbody,
    userId: req.session.userId
  });
  return {offerId:insertion.insertedId};
};

let getById = async (offerId, db) => {
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

let removeById = async (offerId, db) => {
  await db.collection('offers').deleteOne({_id: ObjectId(offerId)});
};

let update = async (offer, db) => {
  let idToUpdate = offer._id;
  delete offer._id;
  await db.collection('offers').updateOne({_id: ObjectId(idToUpdate)}, {$set: offer});
};

module.exports = {add, getById, getByUserId, getAll, removeById, update};

require("dotenv").config({path: 'certs/.env'});
const {MongoClient, serverApiVersion, MongoServerError }= require("mongodb");

// Create Uri
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@studentcluster.3sh2db9.mongodb.net/test`

const client = new MongoClient(uri);

const PingDatabase = async function() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

/**
 * @Description adds a studentRecord document to students collection.
 * @param {studentRecord} obj - is a studentRecord.
 */
const writeToCollection = async function(obj) {
  try{
    await client.connect();

    const myDB = await client.db("myDB");
    const myColl = myDB.collection("students");

    // first check if database has a similar object
    const matches = await myColl.aggregate([{$match: {first_name: obj.first_name, last_name: obj.last_name}}]).toArray();

    // If length is not 0, then database found similar object. Return duplicate values.
    if(matches.length != 0){
      console.log("Duplicate values!!");
      return "Duplicate Values!!"
    }

    // Insert One student records in the collection
    await myColl.insertOne({_id: parseInt(obj.record_id), "first_name": obj.first_name, "last_name": obj.last_name, "gpa": obj.gpa, "enrolled": obj.enrolled},).then((valueOrbool) => {

      // If returned response is false, print error
      if(valueOrbool.acknowledged == false)
        console.log("Error - Could not insert document");
      else
        console.log(`document is writen to ${myDB.databaseName} in collection ${myColl.collectionName}`);
    });

  } catch(error) {

    if (error instanceof MongoServerError) {
      console.log(`Error - ${error}`); // special case for some reason
    }
  } finally {

    // Close client
    await client.close();
  }
}

/**
 * @Description Deletes a studentRecord from collection
 * @param {Int} objId - Student Record Id.
 * @returns {Promise<string>} - returns resonse string
 */
const DeleteFromCollection = async function (objId){
  try{
    await client.connect();

    const myDB = await client.db("myDB");
    const myColl = myDB.collection("students");

    // Create query
    const query = {_id: parseInt(objId) };

    // stores result of document being deleted
    var result;

    // Delete student record in collection
    await myColl.findOneAndDelete(query).then(async (document) => {
      if(document.value == null)
        console.log("Error - The document was not found");
      else{
        const responsestr = {status: "success", data: [document.value]}//"The following document has been deleted\n" + JSON.stringify(document.value);
        result = responsestr;
      }
    });
    return result;
  } catch(error) {

    if (error instanceof MongoServerError) {
      console.log(`Error - ${error}`); // special case for some reason
    }
  } finally {
    await client.close();
  } 
}

/**
 * @descripton Reads all values in student collection.
 * @returns Returns Array of all studentRecords in collection.
 */
const ReadCollection = async function (){
  try{
    await client.connect();

    const myDB = await client.db("myDB");
    const myColl = myDB.collection("students");

    // Returns entire collection
    var myCursorAry = await myColl.find().toArray();
    if(myCursorAry.length === 0)
      console.log(`There are no documents in ${myColl.collectionName} collection`);
    else{
      myCursorAry.forEach((document) => console.log(document));
      return myCursorAry;
    }

  } catch(error) {

    if (error instanceof MongoServerError) {
      console.log(`Error - ${error}`); // special case for some reason
    }
  } finally {
    await client.close();
  }
}

/**
 * @description Reads a matching Student Record
 * @param {Int} objId - StudentRecord Id.
 */
const Readdocument = async function (objId){
  try{
    await client.connect();

    const myDB = await client.db("myDB");
    const myColl = myDB.collection("students");

    const query = {_id : parseInt(objId)}
    console.log(query)

    var myCursorAry = await myColl.find(query).toArray();
    if(myCursorAry.length === 0)
      console.log(`There are no document with record id ${query._id} in ${myColl.collectionName} collection`);
    else{
      myCursorAry.forEach((document) => console.log(document));
      return myCursorAry;
    }

  } catch(error) {

    if (error instanceof MongoServerError) {
      console.log(`Error - ${error}`); // special case for some reason
    }
  } finally {
    await client.close();
  }
}

/**
 * @description Updates matching StudentRecord.
 * @param {Int} objId - StudentRecord Id.
 * @param {JSON} query - Json object of key/value pairs to be changed.
 */
const updatedocument = async function (id, query){
  try{
    await client.connect();

    const myDB = await client.db("myDB");
    const myColl = myDB.collection("students");

    const newquery = {
      $set: query,
    };

    const queryid = {_id: parseInt(id)};
    const result = await myColl.updateOne(queryid, newquery).then((valueOrbool) => {

      // If returned response is false, print error
      if(valueOrbool.acknowledged == false)
        console.log("Error - Could not update document");
      else
        console.log(`document is writen to ${myDB.databaseName} in collection ${myColl.collectionName}`);
    });

  } catch(error) {

    if (error instanceof MongoServerError) {
      console.log(`Error - ${error}`); // special case for some reason
    }
  } finally {

    // Close client
    await client.close();
  }
}

module.exports = {client, PingDatabase, writeToCollection, DeleteFromCollection, ReadCollection, Readdocument, updatedocument}
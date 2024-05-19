const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
 
async function postPredict(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const MAX_SIZE = 1000000; // 1MB dalam byte
  if (image.length > MAX_SIZE) {
    const response = h.response({
      status: 'fail',
      message: 'Payload content too length greater than maximum allowed: 1000000'
    });
    response.code(413);
    return response;
  }

  try {
    const { label, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
   
    const data = {
      "id": id,
      "result": label,
      "suggestion": suggestion,
      "createdAt": createdAt,
    }

    const history = {
      "result": label,
      "createdAt": createdAt,
      "suggestion": suggestion,
      "id": id,
    }

    // await storeData(id, history);
   
    const response = h.response({
      status: 'success',
      message: 'Model is predicted successfully',
      data
    })
    response.code(201);
    return response;
  } catch (error) {
    const response = h.response({
      status: 'fail',
      message: 'Terjadi kesalahan dalam melakukan prediksi'
    });
    response.code(400);
    return response;
  } 
}

const getPredict = async (request, h) => {
  const db = new Firestore();
  const predictionCollection = db.collection('predictions');
  const predictionSnapshot = await predictionCollection.get();

  const data = [];
  predictionSnapshot.forEach((doc) => {
      const history = {
          id: doc.id,
          history: doc.data()
      };
      data.push(history);
  });

  const response = h.response({
      status: 'success',
      data: data
  });
  response.code(200);
  return response;
}

module.exports = { postPredict, getPredict };
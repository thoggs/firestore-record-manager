import * as functions from "firebase-functions";
import {RecordService} from "../services/RecordService";
import {Record} from "../types/Record";

const recordService = new RecordService();

/**
 * HTTP function to add a new record.
 * @param {functions.https.Request} req - The request object.
 * @param {functions.Response} res - The response object.
 */
export const addRecord = functions.https.onRequest(async (req, res) => {
  try {
    const name: string = req.body.name;
    const incrementId: number = await recordService.getNextIncrementId();

    const newRecord: Record = {
      name: name,
      increment_id: incrementId,
    };

    await recordService.addRecord(newRecord);
    res.json({result: `Record with ID: ${incrementId} added.`});
  } catch (error) {
    console.error("Error adding record: ", error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * Firestore trigger that is fired when a new record is created.
 * @param {functions.firestore.DocumentSnapshot} snap - The document snapshot.
 * @param {functions.EventContext} context - The event context.
 */
export const onRecordCreate = functions.firestore.document("records/{recordId}")
  .onCreate((snap) => {
    const newValue = snap.data();
    console.log("New record created with ID:", newValue.increment_id);
  });

import * as functions from "firebase-functions";
import {RecordService} from "../services/RecordService";
import {Record} from "../types/Record";
import {
  formatSuccessResponse,
  formatErrorResponse,
} from "../utils/responseFormatter";

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

    const response = formatSuccessResponse(
      [newRecord],
      "Operation completed successfully."
    );
    res.json(response);
  } catch (error) {
    console.error("Error adding record: ", error);
    const response = formatErrorResponse(
      "INTERNAL_SERVER_ERROR",
      "Internal Server Error"
    );
    res.status(500).json(response);
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

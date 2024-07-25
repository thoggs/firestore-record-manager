import * as admin from "firebase-admin";
import {Record} from "../types/Record";
import {FirebaseConfig} from "../config/FirebaseConfig";

FirebaseConfig.initialize();

/**
 * Repository for accessing Firestore.
 */
export class RecordRepository {
  private firestore;

  /**
   * Creates an instance of RecordRepository.
   * Initializes the Firestore instance from the Firebase Admin SDK.
   */
  constructor() {
    this.firestore = admin.firestore();
  }

  /**
   * Gets the last added record, ordered by increment ID.
   * @return {Promise<FirebaseFirestore.DocumentData | null>}
   */
  async getLastRecord(): Promise<FirebaseFirestore.DocumentData | null> {
    const snapshot = await this.firestore
      .collection("records")
      .orderBy("increment_id", "desc")
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }
    return snapshot.docs[0].data();
  }

  /**
   * Adds a new record to Firestore.
   * @param {Record} record - The record to be added.
   * @return {Promise<void>} A promise that resolves when the record is added.
   */
  async addRecord(record: Record): Promise<void> {
    await this.firestore.collection("records").add(record);
  }
}

import {RecordRepository} from "../repositories/RecordRepository";
import {Record} from "../types/Record";

/**
 * Service to manage operations related to records.
 */
export class RecordService {
  private recordRepository: RecordRepository;

  /**
   * Creates an instance of RecordService.
   * Initializes the RecordRepository instance.
   */
  constructor() {
    this.recordRepository = new RecordRepository();
  }

  /**
   * Gets the next increment ID for a new record.
   * @return {Promise<number>} The next increment ID.
   */
  async getNextIncrementId(): Promise<number> {
    const lastRecord = await this.recordRepository.getLastRecord();
    if (!lastRecord) {
      return 1;
    }
    return lastRecord.increment_id + 1;
  }

  /**
   * Adds a new record to Firestore.
   * @param {Record} record - The record to be added.
   * @return {Promise<void>} A promise that resolves when the record is added.
   */
  async addRecord(record: Record): Promise<void> {
    await this.recordRepository.addRecord(record);
  }
}

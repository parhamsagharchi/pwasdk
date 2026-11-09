export interface INfcTextRecord {
  recordType: "text";
  data: string;
}

export interface INfcUrlRecord {
  recordType: "url";
  data: string;
}

export type TNfcRecord = INfcTextRecord | INfcUrlRecord;

export interface INfcMessage {
  records: TNfcRecord[];
}

export type TNfcReadingListener = (message: INfcMessage) => void;

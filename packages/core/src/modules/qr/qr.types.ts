export interface IQrResult {
  rawValue: string;
  format: string;
}

export type TQrDetectListener = (results: IQrResult[]) => void;

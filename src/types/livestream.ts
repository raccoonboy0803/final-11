import { Product } from './product';

interface Status {
  state: string;
  pctComplete: string;
  errorReasonCode: string;
  errorReasonText: string;
}

interface Meta {
  name: string;
}

interface Input {
  width: number;
  height: number;
}

interface Playback {
  hls: string;
  dash: string;
}

interface PublicDetails {
  title: string | null;
  share_link: string | null;
  channel_link: string | null;
  logo: string | null;
}

interface LiveStreamData {
  livestream_id: string;
  stream_title: string;
  category: string;
  description: string;
  stream_key: string;
  stream_id: string;
  video_uid: string;
  create_at: string; // ISO 8601 날짜 형식, Date 객체로 변환될 수 있음
  livestream_product_id: string;
  thumbnail_url: string;
  product_title: string;
  livestream_seller_id: string;
  is_live: boolean;
}

export interface Video {
  uid: string;
  creator: string | null;
  thumbnail: string;
  thumbnailTimestampPct: number;
  readyToStream: boolean;
  readyToStreamAt: string;
  status: Status;
  meta: Meta;
  created: string;
  modified: string;
  scheduledDeletion: string | null;
  size: number;
  preview: string;
  allowedOrigins: string[];
  requireSignedURLs: boolean;
  uploaded: string;
  uploadExpiry: string | null;
  maxSizeBytes: number | null;
  maxDurationSeconds: number | null;
  duration: number;
  input: Input;
  playback: Playback;
  watermark: string | null;
  liveInput: string;
  clippedFrom: string | null;
  publicDetails: PublicDetails;
  streamData: LiveStreamData[];
}

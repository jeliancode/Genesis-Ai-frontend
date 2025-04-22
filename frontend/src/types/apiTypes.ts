export interface DocumentUploadResponse {
  message: string;
  predicted_category: string;
  document_id: string;
}

export interface QueryRequest {
  prompt: string;
}

export interface SearchResult {
  id: string;
  score: number;
  title: string;
  abstract: string;
  keywords: string;
  category: string;
}

export interface QueryResponse {
  results: SearchResult[];
}

export interface ClusterPoint {
  x: number;
  y: number;
  label: string;
  document_id: string;
  title: string;
  category: string;
}

export interface ClusterMeta {
  method: string;
  n_clusters: number;
  total_documents: number;
}

export interface ClusterResponse {
  points: ClusterPoint[];
  meta: ClusterMeta;
}

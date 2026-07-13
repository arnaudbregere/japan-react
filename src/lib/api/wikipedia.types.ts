export type WikipediaCoordinate = {
  lat: number;
  lon: number;
  primary?: boolean;
};

export type WikipediaThumbnail = {
  source: string;
  width: number;
  height: number;
};

export type WikipediaPage = {
  pageid: number;
  title: string;
  missing?: boolean;
  extract?: string;
  thumbnail?: WikipediaThumbnail;
  coordinates?: WikipediaCoordinate[];
};

export type WikipediaTitleMapping = {
  from: string;
  to: string;
};

export type WikipediaQueryResponse = {
  query?: {
    pages: WikipediaPage[];
    normalized?: WikipediaTitleMapping[];
    redirects?: WikipediaTitleMapping[];
  };
  error?: {
    code: string;
    info: string;
  };
};

export type FetchLieuxParams = {
  page?: number;
};
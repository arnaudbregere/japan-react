export type Location = {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
};

export type LocationListResponse = {
  data: Location[];
  pagination: {
    currentPage: number;
    hasNextPage: boolean;
    lastVisiblePage: number;
  };
};
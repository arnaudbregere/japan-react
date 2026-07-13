export type Lieu = {
  id: string;
  nom: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
};

export type LieuListResponse = {
  data: Lieu[];
  pagination: {
    currentPage: number;
    hasNextPage: boolean;
    lastVisiblePage: number;
  };
};
export type WikidataSparqlResponse = {
  results: {
    bindings: WikidataBinding[];
  };
};

type WikidataValue = {
  value: string;
};

export type WikidataBinding = {
  lieu: WikidataValue;
  lieuLabel: WikidataValue;
  description?: WikidataValue;
  coord: WikidataValue;
  image?: WikidataValue;
};

export type FetchLieuxParams = {
  page?: number;
};
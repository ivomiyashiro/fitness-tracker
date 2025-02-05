export type GetParams = {
  limit?: number;
  offset?: number;
  search?: string;
};

export type RequestParams = {
  [key: string]: unknown;
};

export type RequestData = {
  [key: string]: unknown;
};

export type DeletedResponse = {
  deleted: boolean;
};

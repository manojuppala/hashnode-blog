import type { Publication as PublicationType, Edge as EdgeType } from "../../../types";

export const formatPost = (res: PublicationType) =>
  res?.publication?.posts?.edges?.map((edge: EdgeType) => edge.node);

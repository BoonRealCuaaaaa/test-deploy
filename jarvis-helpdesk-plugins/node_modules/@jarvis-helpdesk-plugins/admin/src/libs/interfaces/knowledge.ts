export interface IKnowledge {
  id: string;
  knowledgeName: string;
  numUnits: number;
  totalSize: number;
  createdAt: Date;
  createdBy: string | null;
  deletedAt: string | null;
  description: string;
  updatedAt: Date;
  updatedBy: string | null;
}

import { ExperienceTypeEnum } from "../../../data/types";

export const isWorkEntry = (type: ExperienceTypeEnum): boolean =>
  type === ExperienceTypeEnum.Work;

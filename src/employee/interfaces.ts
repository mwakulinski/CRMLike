export interface IEmployee {
  id: number;
  name: string;
  surname: string;
  githubAccount: string;
  employmentType: IEmploymentType;
}

export type IEmploymentType = "B2B" | "UZ";

export interface IEmployeeCreate {
  name: string;
  surname: string;
  githubAccount: string;
  employmentType: IEmploymentType;
}

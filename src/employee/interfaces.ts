export interface IEmployee {
  id: number;
  name: string;
  surname: string;
  githubAccount: string;
  employmentType: IEmploymentType;
}

export enum EmploymentType {
  B2B = "B2B",
  UZ = "UZ",
}

export type IEmploymentType = keyof typeof EmploymentType;

export interface IEmployeeCreate {
  name: string;
  surname: string;
  githubAccount: string;
  employmentType: IEmploymentType;
}

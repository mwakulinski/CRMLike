export interface IEmployee {
  id: number;
  name: string;
  surname: string;
  githubAccount: string;
  employmentType: EmploymentType;
}

export enum Employment {
  B2B = "B2B",
  UZ = "UZ",
}

export type EmploymentType = keyof typeof Employment;

export interface IEmployeeCreate {
  name: string;
  surname: string;
  githubAccount: string;
  employmentType: EmploymentType;
}

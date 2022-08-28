export interface IEmployee {
  name: string;
  surname: string;
  githubAccount: string;
  employmentType: IEmploymentType;
}

export type IEmploymentType = "B2B" | "UZ";

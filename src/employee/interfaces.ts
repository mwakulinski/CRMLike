export type EmployeeType = {
  id: string;
  name: string;
  surname: string;
  githubAccount: string;
  employmentType: EmploymentType;
};

export enum Employment {
  B2B = "B2B",
  UZ = "UZ",
}

export type EmploymentType = keyof typeof Employment;
export const EmploymentTypeArr = Object.values(Employment);

export type EmployeeCreateType = {
  name: string;
  surname: string;
  githubAccount: string;
  employmentType: EmploymentType;
};

export type EmployeeUniqueProperty = "id" | "githubAccount";

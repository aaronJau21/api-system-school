export interface IUser {
  id: number;
  email: string;
  name: string;
  father_lastname: string;
  mother_lastname: string;
  status: boolean;
  images: string | null;
}

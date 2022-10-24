type RoleDto = Array<string>;

export interface UserDto {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  phone_number?: string;
  role?: RoleDto | string;
}

export interface PhotoDto {
  name: string;
  description: string;
  filename: string;
  views: number;
  isPublished: boolean;
}

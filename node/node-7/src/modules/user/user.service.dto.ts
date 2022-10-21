type RoleDto = Array<string>;

interface UserDto {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  phone_number?: number;
  roles?: RoleDto;
}

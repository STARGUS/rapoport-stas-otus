type nameDto = string;
type ageDto = string | number;
type addressDto = string;
interface DataDto {
  name: nameDto;
  age: ageDto;
  address: addressDto;
  [key: string]: string | number;
}
interface editFileDto {
    name?: string;
    value?: ageDto;
    dataobj?: DataDto;
  }
export { nameDto, ageDto, addressDto, DataDto, editFileDto };

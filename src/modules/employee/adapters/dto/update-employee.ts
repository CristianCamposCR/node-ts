export type UpdateEmployeeDto = {
    id: number,
    name: String,
    surname: String,
    lastname?: String | null, 
    email: Text
}
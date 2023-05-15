import { ResponseApi } from "@/kernel/types"
import { Employee } from "../../entities/employee"
import { SaveEmployeeDto } from "../../adapters/dto/save-employee"
import { UpdateEmployeeDto } from "../../adapters/dto/update-employee"

export interface EmployeeRepository {
    findAll(): Promise<Employee[]>
    findEmployee(payload: number): Promise<Employee>
    saveEmployee(payload: SaveEmployeeDto): Promise<Employee>
    updateEmployee(payload: UpdateEmployeeDto): Promise<Employee>
    deleteEmployee(payload: number): Promise<Employee>
}
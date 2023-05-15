import { UseCase } from "@/kernel/contracts"
import { UpdateEmployeeDto } from "../adapters/dto/update-employee"
import { ResponseApi } from "@/kernel/types"
import { Employee } from "../entities/employee"
import { EmployeeRepository } from "./ports/employee.repository"

export class UpdateEmployeeInteractor implements UseCase<UpdateEmployeeDto, Employee> {
    constructor(private readonly employeeRepository: EmployeeRepository){}
    execute(payload: UpdateEmployeeDto): Promise<Employee> {
        return this.employeeRepository.updateEmployee(payload)
    }
}

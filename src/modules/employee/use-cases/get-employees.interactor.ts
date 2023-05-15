import { UseCase } from "@/kernel/contracts"
import { ResponseApi } from "@/kernel/types"
import { GetEmployeesDto } from "../adapters/dto/get-employees"
import { Employee } from "../entities/employee"
import { EmployeeRepository } from "./ports/employee.repository"

export class GetEmployeesInteractor implements UseCase<GetEmployeesDto, Employee[]> {
    constructor(private readonly employeeRepository: EmployeeRepository){}
    execute(): Promise<Employee[]> {
        return this.employeeRepository.findAll()
    }
}
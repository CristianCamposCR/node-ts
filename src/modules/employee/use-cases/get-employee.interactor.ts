import { UseCase } from "@/kernel/contracts"
import { GetEmployeesDto } from "../adapters/dto/get-employees"
import { ResponseApi } from "@/kernel/types"
import { Employee } from "../entities/employee"
import { EmployeeRepository } from "./ports/employee.repository" 

export class GetEmployeeInteractor implements UseCase<number, Employee> {
    constructor(private readonly employeeReposotory: EmployeeRepository){}

    execute(payload: number): Promise<Employee> {
        return this.employeeReposotory.findEmployee(payload)
    }
}


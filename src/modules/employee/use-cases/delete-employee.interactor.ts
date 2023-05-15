import { UseCase } from "@/kernel/contracts"
import { ResponseApi } from "@/kernel/types"
import { Employee } from "../entities/employee"
import { EmployeeRepository } from "./ports/employee.repository"


export class DeleteEmployeeInteractor implements UseCase<number, Employee> {
    constructor(private readonly employeeRepository: EmployeeRepository){}

    execute(payload: number): Promise<Employee> {
        return this.employeeRepository.deleteEmployee(payload)
    }
}
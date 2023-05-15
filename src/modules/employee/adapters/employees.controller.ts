import { Request, Response, Router } from "express"
import { GetEmployeesInteractor } from "../use-cases/get-employees.interactor"
import { GetEmployeeInteractor } from "../use-cases/get-employee.interactor"
import { SaveEmployeeInteractor } from "../use-cases/save-employee.interactor"
import { UpdateEmployeeInteractor } from "../use-cases/update-employee.interactor"
import { DeleteEmployeeInteractor } from "../use-cases/delete-employee.interactor"
import { Employee } from "../entities/employee"
import { EmployeeRepository } from "../use-cases/ports/employee.repository"
import { GetEmployeesDto } from "./dto/get-employees"
import { SaveEmployeeDto } from "./dto/save-employee"
import { UpdateEmployeeDto } from "./dto/update-employee"
import { EmployeeStorageGateway } from "./employees.storage.gateway"
import { ResponseApi } from "@/kernel/types"

const router = Router()

export class EmployeeController {
    static getError(): ResponseApi<Employee> {
        return {
            code: 500,
            error: true,
            message: 'INTERNA_SERVER_ERROR',
        } as ResponseApi<Employee>
    }

    static findAll = async (_req: Request, res: Response): Promise<Response> => {
        try {
            const repo: EmployeeRepository = new EmployeeStorageGateway()
            const interactor: GetEmployeesInteractor = new GetEmployeesInteractor(repo)

            const employees: Employee[] = await interactor.execute()
            const body: ResponseApi<Employee> = {
                code: 200,
                error: false,
                message: 'OK',
                count: employees.length,
                entities: employees
            }
            return res.status(body.code).json(body)
        } catch (error) {
            return res.status(this.getError().code).json(this.getError())
        }
    }
    static findOneEmployee = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id)
            const repo: EmployeeRepository = new EmployeeStorageGateway()
            const interactor: GetEmployeeInteractor = new GetEmployeeInteractor(repo)

            const employee: Employee = await interactor.execute(id)
            let body: ResponseApi<Employee> = {
                code: 200,
                error: false,
                message: 'OK',
                count: 1,
                entity: employee
            }
            if(!employee) body = {...body, code: 404, message: 'NOT_FOUND', count: undefined}
            return res.status(body.code).json(body)
        } catch (error) {
            return res.status(this.getError().code).json(this.getError())
        }
    }
    static saveEmployee = async (req: Request, res: Response): Promise<Response> => {
        try {
            const payload: SaveEmployeeDto = { ...req.body } as SaveEmployeeDto
            const repo: EmployeeRepository = new EmployeeStorageGateway()
            const interactor: SaveEmployeeInteractor = new SaveEmployeeInteractor(repo)

            const createdEmployee: Employee = await interactor.execute(payload)
            const body: ResponseApi<Employee> = {
                code: 201,
                error: false,
                message: 'CREATED',
                count: 1,
                entity: createdEmployee
            }
            return res.status(body.code).json(body)
        } catch (error) {
            return res.status(this.getError().code).json(this.getError())
        }
    }
    static updateEmployee = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id)
            const payload: UpdateEmployeeDto = { id: id, ...req.body } as UpdateEmployeeDto
            const repo: EmployeeRepository = new EmployeeStorageGateway()
            const interactor: UpdateEmployeeInteractor = new UpdateEmployeeInteractor(repo)
            
            const updatedEmployee: Employee = await interactor.execute(payload)
            let body: ResponseApi<Employee> = {
                code: 200,
                error: false,
                message: 'OK',
                count: 1,
                entity: updatedEmployee
            }
            if(!updatedEmployee) body = {...body, code: 404, message: 'NOT_FOUND', count: undefined}
            return res.status(body.code).json(body)
        } catch (error) {
            return res.status(this.getError().code).json(this.getError())
        }
    }
    static deleteEmployee = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id)
            const repo: EmployeeRepository = new EmployeeStorageGateway()
            const interactor: DeleteEmployeeInteractor = new DeleteEmployeeInteractor(repo)
    
            const deletedEmployee: Employee = await interactor.execute(id)
            let body: ResponseApi<Employee> = {
                code: 200,
                error: false,
                message: 'OK',
                count: 1,
                entity: deletedEmployee
            }
            if(!deletedEmployee) body = {...body, code: 404, message: 'NOT_FOUND', count: undefined}
            return res.status(body.code).json(body)
        } catch (error) {
            return res.status(this.getError().code).json(this.getError())
        }
    }
}

router.get('/', EmployeeController.findAll)
router.get('/:id', EmployeeController.findOneEmployee)
router.post('/', EmployeeController.saveEmployee)
router.put('/:id', EmployeeController.updateEmployee)
router.delete('/:id', EmployeeController.deleteEmployee)

export default router
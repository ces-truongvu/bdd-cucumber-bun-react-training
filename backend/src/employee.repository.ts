import fs from 'fs'
import { EmployeeType } from './employees'
import { generateMockData } from './employees.mock'

export class EmployeeRepository {
  private filePath: string

  constructor(filePath: string) {
    this.filePath = filePath
    if (!fs.existsSync(this.filePath)) {
      this.generateMockData()
    }
  }

  private generateMockData(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(generateMockData()), 'utf8')
  }

  public getAllEmployees(): Promise<EmployeeType[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          const employees = JSON.parse(data)
          resolve(employees)
        }
      })
    })
  }

  public getEmployeeById(id: string): Promise<EmployeeType | null> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          const employees = JSON.parse(data)
          const employee = employees.find((e: EmployeeType) => e.id === id)
          resolve(employee || null)
        }
      })
    })
  }

  public createEmployee(employee: EmployeeType): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          const employees = JSON.parse(data)
          employees.push(employee)
          fs.writeFile(this.filePath, JSON.stringify(employees), 'utf8', (err) => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          })
        }
      })
    })
  }

  public updateEmployee(employee: EmployeeType): Promise<EmployeeType> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          const employees = JSON.parse(data)
          const index = employees.findIndex((e: EmployeeType) => e.id === employee.id)
          if (index !== -1) {
            employees[index] = employee
            fs.writeFile(this.filePath, JSON.stringify(employees), 'utf8', (err) => {
              if (err) {
                reject(err)
              } else {
                resolve(employee)
              }
            })
          } else {
            reject(new Error('Employee not found'))
          }
        }
      })
    })
  }

  public deleteEmployee(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          const employees = JSON.parse(data)
          const index = employees.findIndex((e: EmployeeType) => e.id === id)
          if (index !== -1) {
            employees.splice(index, 1)
            fs.writeFile(this.filePath, JSON.stringify(employees), 'utf8', (err) => {
              if (err) {
                reject(err)
              } else {
                resolve()
              }
            })
          } else {
            reject(new Error('Employee not found'))
          }
        }
      })
    })
  }
}

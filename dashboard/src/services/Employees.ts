export type EmployeeType = {
  id: string
  name: string
  title: string
  email: string
  phone: string
  address: string
  bio: string
  image: string
}

export async function getAllEmployees(): Promise<Array<EmployeeType>> {
  try {
    const response = await fetch('/api/employees', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const { data } = await response.json()
    return data
  } catch {
    throw new Error('Employee ')
  }
}

type ResponseType<T> = {
  message: string
  data?: T
}
export const handler = {
  response: (code: number, response: ResponseType<any>) =>
    new Response(JSON.stringify(response), {
      status: code,
      headers: {
        'Content-Type': 'application/json'
      }
    })
}

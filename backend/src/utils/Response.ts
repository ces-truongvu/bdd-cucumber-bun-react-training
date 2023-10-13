type ResponseType<T> = {
  message: string
  data?: T
}
export const Handler = {
  Response: (code: number, message: ResponseType<any>) =>
    new Response(JSON.stringify(message), {
      status: code,
      headers: {
        'Content-Type': 'application/json'
      }
    })
}

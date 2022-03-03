export class User {
  constructor(
    public id: string,
    public nome: string,
    public sobrenome: string,
    public email: string,
    public cpf: number,
    public nascimento: string,
    public cidade: string,
    public estado: string,
    public cep: number
  ){}
}

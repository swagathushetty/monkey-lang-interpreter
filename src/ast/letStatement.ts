import { Token } from "../token/token"
import { Expression, Identifier, Statement } from "./ast"

export class LetStatement implements Statement {
    private token:Token
    public name?: Identifier
    private value?:Expression

    private constructor(token:Token){
        this.token = token
        // this.name = name
        // this.value = value
    }

    public static new(token:Token){
        return new LetStatement(token)
    }

    public statementNode(): void {
        
    }

    public tokenLiteral(): string {
        return this.token.literal
    }
}

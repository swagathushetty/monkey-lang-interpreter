import { Token } from "../token/token"
import { Expression, Statement } from "./ast"
import { Identifier } from "./identifier"

export class LetStatement implements Statement {
    private token:Token
    public name?: Identifier
    public value?:Expression

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

    public string(): string {
        let out:string = ""

        out += this.tokenLiteral()+ " "
        out += this.name?.string()
        out += " = "
        if(this.value){
            out += this.value.string()
        }
        out += ";"
        return out
    }
}

import { Token } from "../token/token"
import { Expression, Statement } from "./ast"

export class ReturnStatement implements Statement {
    private token:Token
    private returnValue?:Expression

    private constructor(token:Token){
        this.token = token
    }

    public static new(token:Token):ReturnStatement{
        return new ReturnStatement(token)
    }
    public statementNode(): void {
        
    }

    public tokenLiteral(): string {
        return this.token.literal
    }

    public string(): string {
        let out:string = ""

        out += this.tokenLiteral()+ " "
        
        if(this.returnValue){
            out += this.returnValue.string()
        }
        
        out += ";"
        return out
    }


}
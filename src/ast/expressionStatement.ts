import { Token } from "../token/token";
import { Expression, Statement } from "./ast";

export class ExpressionStatement implements Statement {
    private token:Token
     expression?:Expression

    private constructor(token:Token){
        this.token = token
    }

    public static new(token:Token):ExpressionStatement{
        return new ExpressionStatement(token)
    }

    public statementNode(): void {
        
    }

    public tokenLiteral(): string {
        return this.token.literal
    }

    public string(): string {
       
        if(this.expression){
            return this.expression.string()
        }
        return ""
    }
}
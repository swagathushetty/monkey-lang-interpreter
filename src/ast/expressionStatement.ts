import { Token } from "../token/token";
import { Expression, Statement } from "./ast";

class ExpressionStatement implements Statement {
    private token:Token
    private expression:Expression

    constructor(token:Token,expression:Expression){
        this.token = token
        this.expression = expression
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
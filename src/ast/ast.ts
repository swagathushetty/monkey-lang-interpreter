import { Token } from "../token/token";

interface ASTNode {
    tokenLiteral():string;
}

export interface Statement extends ASTNode {
    statementNode():void
}

interface Expression extends ASTNode {
    expressionNode():void
}

//let x = 5

//tree structure
//program
    // let -> statement
        // x= identifier 
        // 5 expression

export class Program implements ASTNode {
    public statements: Statement[];

    constructor(statements: Statement[]){
        this.statements = statements
    }

    public tokenLiteral():string{
        
        if(this.statements.length > 0){
            return this.statements[0].tokenLiteral()
        }

        return ""
    }
} 

export class LetStatement implements Statement {
    private token:Token
    public name: Identifier
    private value:Expression

    constructor(token:Token,name:Identifier,value:Expression){
        this.token = token
        this.name = name
        this.value = value
    }

    public statementNode(): void {
        
    }

    public tokenLiteral(): string {
        return this.token.literal
    }
}

class Identifier implements Expression {
    private token:Token
    public value:string

    constructor(token:Token,value:string){
        this.token = token
        this.value = value
    }

    public expressionNode(): void {
        
    }

    public tokenLiteral(): string {
        return this.token.literal
    }
}
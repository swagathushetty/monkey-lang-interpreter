import { ASTNode, Statement } from "./ast";



//let x = 5

//tree structure
//program
    // let -> statement
        // x= identifier 
        // 5 expression
export class Program implements ASTNode {
    public statements: Statement[];

    private constructor(statements: Statement[]){
        this.statements = statements
    }

    public static new():Program {
        return new Program([])
    }

    public tokenLiteral():string{
        
        if(this.statements.length > 0){
            return this.statements[0].tokenLiteral()
        }

        return ""
    }
} 
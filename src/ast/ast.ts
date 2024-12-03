interface ASTNode {
    tokenLiteral():string;
}

interface Statement extends ASTNode {}

interface Expression extends ASTNode {}

class Program implements ASTNode {
    private statements: Statement[];

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
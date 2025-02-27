
export interface ASTNode {
    tokenLiteral():string;
    string(): string // debugging and testing
}

export interface Statement extends ASTNode {
    statementNode():void
}

export interface Expression extends ASTNode {
    expressionNode():void
}





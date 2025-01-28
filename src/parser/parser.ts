import {  Expression, Statement } from "../ast/ast";
import { ExpressionStatement } from "../ast/expressionStatement";
import { Identifier } from "../ast/identifier";
import { LetStatement } from "../ast/letStatement";
import { Program } from "../ast/program";
import { ReturnStatement } from "../ast/returnStatement";
import { Lexer } from "../lexer/lexer";
import { Token, TokenType, TokenTypes } from "../token/token";

type PrefixParseFn = () => Expression
type InfixParseFn = (expression:Expression) => Expression

enum PrecedenceTable {
    LOWEST = 1,
    EQUALS,
    LESSGREATER,
    SUM,
    PRODUCT,
    PREFIX,
    CALL
}
export class Parser {
    private lexer: Lexer
    private curToken?: Token
    private peekToken?: Token
    private errors:string[]
    private prefixParseFns = new Map<TokenType,PrefixParseFn>()
    private infixParseFns = new Map<TokenType,InfixParseFn>()

    private constructor(lexer:Lexer) {
        this.lexer = lexer
        this.errors = []
        
    }

    public static new(lexer:Lexer):Parser {
        const parser = new Parser(lexer)
        parser.nextToken()
        parser.nextToken()

        parser.registerPrefix(TokenTypes.IDENT,parser.parseIdentifier)
        return parser
    }

    private nextToken(){
        this.curToken = this.peekToken
        this.peekToken = this.lexer.nextToken()
    }

    public parseProgram():Program {
        const program = Program.new()

        while(!this.curTokenIs(TokenTypes.EOF)){
            const stmt = this.parseStatement()

            if (stmt){
                program.statements.push(stmt)
            }
            this.nextToken()
        }

        return program
    }


    private parseStatement():Statement | null {
        switch(this.curToken?.type){
            case TokenTypes.LET:
                return this.parseLetStatement()
            case TokenTypes.RETURN:
                return this.parseReturnStatement()
            default:
                return this.parseExpressionStatement()
        }
    }

    private parseLetStatement():LetStatement | null{
        const stmt = LetStatement.new(this.curToken!)
        
        if(!this.expectPeek(TokenTypes.IDENT)){
            return null
        }

        stmt.name = Identifier.new(this.curToken!,this.curToken?.literal!)
        
        //check = sign is there
        if(!this.expectPeek(TokenTypes.ASSIGN)){
            return null
        }

        while(!this.curTokenIs(TokenTypes.SEMICOLON)){
            this.nextToken()
        }

        return stmt
    }


    private curTokenIs(t:TokenType):boolean {
        return this.curToken?.type === t
    }

    private expectPeek(t:TokenType):boolean {
        if(this.peekTokenIs(t)){
            this.nextToken()
            return true
        }
        this.peekError(t)
        return false
    }

    private peekTokenIs(t:TokenType):boolean {
        return this.peekToken?.type === t
    }

    public getErrors():string[]{
        return this.errors
    }

    private peekError(t:TokenType){
        const msg = `Expected next token to be ${t}, got ${this.peekToken?.type} instead`

        this.errors.push(msg)
    }

    private parseReturnStatement():ReturnStatement{
        const stmt = ReturnStatement.new(this.curToken!)
        this.nextToken()

        while(!this.curTokenIs(TokenTypes.SEMICOLON)){
            this.nextToken()
        }

        return stmt
    }

    private registerPrefix(tokenType:TokenType,fn:PrefixParseFn){
        this.prefixParseFns.set(tokenType,fn)
    }

    private registerInfix(tokenType:TokenType,fn:InfixParseFn){
        this.infixParseFns.set(tokenType,fn)
    }

    private parseExpressionStatement():ExpressionStatement {
        const stmt = ExpressionStatement.new(this.curToken!)
        stmt.expression = this.parseExpression(PrecedenceTable.LOWEST)

        //below code keeps semicolon optional when using repl editor
        if(this.peekTokenIs(TokenTypes.SEMICOLON)){
            this.nextToken()
        }

        return stmt
    }

    private parseExpression(predence:Number):Expression | undefined{
        const prefix = this.prefixParseFns.get((this.curToken!.type))

        if(!prefix) return undefined

        const leftExp = prefix()

        return leftExp
    }

    private parseIdentifier():Expression{
        return Identifier.new(this.curToken!,this.curToken!.literal)
    }
}
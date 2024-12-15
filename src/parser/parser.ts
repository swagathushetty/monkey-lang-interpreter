import { Program, Statement } from "../ast/ast";
import { Lexer } from "../lexer/lexer";
import { Token, TokenTypes } from "../token/token";

export class Parser {
    private lexer: Lexer
    private curToken?: Token
    private peekToken: Token

    private constructor(lexer:Lexer) {
        this.lexer = lexer
    }

    public static new(lexer:Lexer):Parser {
        const parser = new Parser(lexer)
        parser.nextToken()
        parser.nextToken()
        return parser
    }

    private nextToken(){
        this.curToken = this.peekToken
        this.peekToken = this.lexer.nextToken()
    }

    public parseProgram():Program {
        const program = Program.new()

        while(this.curToken?.type !== TokenTypes.EOF){
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
            default:
                return null
        }
    }
}
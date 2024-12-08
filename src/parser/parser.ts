import { Lexer } from "../lexer/lexer";
import { Token } from "../token/token";

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

    public parseProgram():Program | null {
        return null
    }
}
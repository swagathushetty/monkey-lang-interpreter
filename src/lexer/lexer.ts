import { lookupIdent, Token, TokenType, TokenTypes } from "../token/token";
import { isDigit, isLetter, newToken } from "../helpers/helpers";

export class Lexer {
    private input: string;
    private position:number;
    private readPosition:number; //next pos
    private ch:string;

    private constructor(input:string){
        this.input = input;
        this.position = 0;
        this.readPosition = 0;
        this.ch ="";
    }

    public static newLexer(input:string){
        const lexer = new Lexer(input)
        lexer.readChar()
        return lexer
    }

    private readChar(){
        if(this.readPosition >= this.input.length){
            this.ch = ""
        }else{
            this.ch = this.input[this.readPosition]
        }
        this.position = this.readPosition
        this.readPosition++
    }

    public nextToken():Token{
        let token :Token = {
            type:TokenTypes.EOF,
            literal:''
        }

        this.skipWhiteSpace()
        switch(this.ch){
            case '=':
                if(this.peekChar() == "="){
                    const ch = this.ch
                    this.readChar()
                    token = newToken(TokenTypes.EQ,"==")
                    break
                }
                token = newToken(TokenTypes.ASSIGN,this.ch)
                break
            case ';':
                token = newToken(TokenTypes.SEMICOLON,this.ch)
                break
            case '(':
                token = newToken(TokenTypes.LPAREN,this.ch)
                break
            case ')':
                token = newToken(TokenTypes.RPAREN,this.ch)
                break
            case ',':
                token = newToken(TokenTypes.COMMA,this.ch)
                break
            case '+':
                token = newToken(TokenTypes.PLUS,this.ch)
                break
            case '{':
                token = newToken(TokenTypes.LBRACE,this.ch)
                break
            case '}':
                token = newToken(TokenTypes.RBRACE,this.ch)
                break
            case '-':
                token = newToken(TokenTypes.MINUS,this.ch)
                break
            case '!':
                if(this.peekChar() == "="){
                    const ch = this.ch
                    this.readChar()
                    token = newToken(TokenTypes.NOT_EQ,"!=")
                    break
                }
                token = newToken(TokenTypes.BANG,this.ch)
                break
            case '/':
                token = newToken(TokenTypes.SLASH,this.ch)
                break
            case '*':
                token = newToken(TokenTypes.ASTERIK,this.ch)
                break
            case '<':
                token = newToken(TokenTypes.LT,this.ch)
                break
            case '>':
                token = newToken(TokenTypes.GT,this.ch)
                break
            case "":
                return token
            default:
                if(isLetter(this.ch)){
                    token.literal = this.readIdentifier()
                    token.type = lookupIdent(token.literal)
                    return token
                }else if(isDigit(this.ch)){
                    token.type = TokenTypes.INT
                    token.literal = this.readNumber()
                    return token
                }
                else{
                    token = newToken(TokenTypes.ILLEGAL,this.ch)
                }
        }
        this.readChar()
        return token
    }

    private readIdentifier():string{
        const position = this.position
        while(isLetter(this.ch)){
            this.readChar()
        }

        return this.input.slice(position,this.position)
    }

    private skipWhiteSpace(){
        while(this.ch === ' ' || this.ch === '\t' || this.ch === '\r' || this.ch === '\n'){
            this.readChar()
        }
    }

    private readNumber():string{

        const position = this.position
        while(isDigit(this.ch)){
            this.readChar()
        }

        return this.input.slice(position,this.position)
    }


    private peekChar():string {
        if(this.readPosition == this.input.length){
            return ""
        }else{
            return this.input[this.readPosition]
        }
    }
    
}
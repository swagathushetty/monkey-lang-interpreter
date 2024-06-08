import { TokenTypes } from "../token/token";
import { Lexer } from "./lexer";

describe('lexer',()=>{
    it('should return next token',()=>{
        const input = "=+(){},;";
        const tests = [
            {expectedType:TokenTypes.ASSIGN,expectedLiteral:"="},
            {expectedType:TokenTypes.PLUS,expectedLiteral:"+"},
            {expectedType:TokenTypes.LPAREN,expectedLiteral:"("},
            {expectedType:TokenTypes.RPAREN,expectedLiteral:")"},
            {expectedType:TokenTypes.LBRACE,expectedLiteral:"{"},
            {expectedType:TokenTypes.RBRACE,expectedLiteral:"}"},
            {expectedType:TokenTypes.COMMA,expectedLiteral:","},
            {expectedType:TokenTypes.SEMICOLON,expectedLiteral:";"},
        ];

        const lexer = Lexer.newLexer(input)

        for( const test of tests){
            const currToken = lexer.nextToken()
            expect(currToken.type).toEqual(test.expectedType)
            expect(currToken.literal).toEqual(test.expectedLiteral)
        }
    })
})
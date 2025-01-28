import { Statement } from "../ast/ast"
import { ExpressionStatement } from "../ast/expressionStatement"
import { Identifier } from "../ast/identifier"
import { LetStatement } from "../ast/letStatement"
import { Program } from "../ast/program"
import { ReturnStatement } from "../ast/returnStatement"
import { Lexer } from "../lexer/lexer"
import { Parser } from "./parser"

describe('Parser',()=>{
    it('should return let statements',()=>{
        const input = `
        let x = 5;
        let y = 10;
        let foobar = 838383;
        
        `
        const lexer = Lexer.new(input)
        const parser = Parser.new(lexer)
        const program = parser.parseProgram()

        expect(checkParserErrors(parser)).toBeFalsy()

        expect(program).toBeDefined()
        expect(program?.statements).toHaveLength(3)

        const tests = ["x","y","foobar"]

        tests.forEach((expected,index)=>{
            const stmt = program?.statements[index]
            expect(testLetStatement(stmt,expected)).toBeTruthy()
        })

    })

    it('should parse return statement',()=>{
        const input = `return 5;
         return 10;
         return 9993322;
        `

        const lexer = Lexer.new(input)
        const parser = Parser.new(lexer)
        const program = parser.parseProgram()
        checkParserErrors(parser)

        expect(program.statements).toHaveLength(3)

        for(let stmt of program.statements){
            const returnStmt = stmt 

            expect(returnStmt instanceof ReturnStatement).toBeTruthy()

            expect(returnStmt.tokenLiteral()).toEqual('return')
            
        }
    })

    it('should return identifier expression',()=>{
        const input = 'foobar;'
        const lexer = Lexer.new(input)
        const parser = Parser.new(lexer)
        const program = parser.parseProgram()
        checkParserErrors(parser)


        expect(program.statements).toEqual(1)
        const stmt = program.statements[0]
        expect(stmt instanceof ExpressionStatement).toBeTruthy()

        const identExp = (stmt as ExpressionStatement).expression

        expect(identExp instanceof Identifier).toBeTruthy()

        const ident = identExp as Identifier

        expect(ident.value).toEqual("foobar")
        expect(ident.tokenLiteral()).toEqual("foobar")
    })
})

function testLetStatement(stmt:Statement,expected:string):boolean{
    if(
        !stmt || 
        stmt.tokenLiteral() !== 'let' ||
        !(stmt instanceof LetStatement) ||
        stmt.name?.value !== expected ||
        stmt.name?.tokenLiteral() !== expected
    ){
        return false
    }

    return true

}


function checkParserErrors(parser:Parser):boolean{
    const errors = parser.getErrors()

    console.log(`parser has ${errors.length} errors`)
    for(const error of errors){
        console.error(`parser error ${error}`)
    }

    return errors.length > 0 ? true : false
}
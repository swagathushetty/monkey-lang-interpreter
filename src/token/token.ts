const TokenTypes = {
    IDENT:'IDENT',
    INT:'INT',

    ASSIGN:'=',
    PLUS:'+',

    COMMA:',',
    SEMICOLON:';',

    LPAREN:'(',
    RPAREN:')',
    LBRACE:'{',
    RBRACE:'}',

    FUNCTION: 'FUNCTION',
    LET: "LET",

    ILLEGAL:"ILLEGAL",
    EOF:'EOF'
} 


type TokenType = typeof TokenTypes[keyof typeof TokenTypes]

type Token ={
    type:TokenType,
    literal:string
}
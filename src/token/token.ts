// token/token.ts

enum TokenType {
  ILLEGAL = "ILLEGAL",
  EOF = "EOF",
  IDENT = "IDENT",
  INT = "INT",
  ASSIGN = "=",
  PLUS = "+",
  COMMA = ",",
  SEMICOLON = ";",
  LPAREN = "(",
  RPAREN = ")",
  LBRACE = "{",
  RBRACE = "}",
  FUNCTION = "FUNCTION",
  LET = "LET",
}

class Token {
  type: TokenType;
  literal: string;

  constructor(type: TokenType, literal: string) {
    this.type = type;
    this.literal = literal;
  }
}

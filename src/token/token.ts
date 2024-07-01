export enum TokenType {
  ILLEGAL,
  EOF,
  IDENT,
  INT,
  ASSIGN,
  PLUS,
  MINUS,
  BANG,
  ASTERISK,
  SLASH,
  LT,
  GT,
  EQ,
  NotEq,
  COMMA,
  SEMICOLON,
  LPAREN,
  RPAREN,
  LBRACE,
  RBRACE,
  FUNCTION,
  LET,
  TRUE,
  FALSE,
  IF,
  ELSE,
  RETURN,
}

export class Token {
  type: TokenType;
  literal: string;

  private keywords: { [key: string]: TokenType } = {
    "func": TokenType.FUNCTION,
    "let": TokenType.LET,
    "true": TokenType.TRUE,
    "false": TokenType.FALSE,
    "if": TokenType.IF,
    "else": TokenType.ELSE,
    "return": TokenType.RETURN,
  };

  constructor(type: TokenType, literal: string) {
    this.type = type;
    this.literal = literal;
  }

  lookupIdentifier(identifier: string): TokenType {
    if (this.keywords[identifier]) {
      return this.keywords[identifier];
    } else {
      return TokenType.IDENT;
    }
  }
}

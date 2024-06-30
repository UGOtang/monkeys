import { Token, TokenType } from "../token/mod.ts";

export class Lexer {
  input: string;
  position: number;
  readPosition: number;
  ch: string;

  constructor(input: string) {
    this.input = input;
    this.position = 0;
    this.readPosition = 0;
    this.ch = "";
    this.readChar();
  }

  readChar(): string {
    const char = this.readPosition >= this.input.length
      ? ""
      : this.input[this.readPosition];
    this.position = this.readPosition;
    this.readPosition += 1;
    this.ch = char;
    return char;
  }

  public nextToken(): Token {
    let tok: Token;

    switch (this.ch) {
      case "=":
        tok = new Token(TokenType.ASSIGN, this.ch);
        break;
      case ";":
        tok = new Token(TokenType.SEMICOLON, this.ch);
        break;
      case "(":
        tok = new Token(TokenType.LPAREN, this.ch);
        break;
      case ")":
        tok = new Token(TokenType.RPAREN, this.ch);
        break;
      case ",":
        tok = new Token(TokenType.COMMA, this.ch);
        break;
      case "+":
        tok = new Token(TokenType.PLUS, this.ch);
        break;
      case "{":
        tok = new Token(TokenType.LBRACE, this.ch);
        break;
      case "}":
        tok = new Token(TokenType.RBRACE, this.ch);
        break;
      case "\0":
        tok = new Token(TokenType.EOF, "");
        break;
      default:
        // todo
        tok = new Token(TokenType.ILLEGAL, "");
        break;
    }

    this.readChar();
    return tok;
  }
}

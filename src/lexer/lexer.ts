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
    let tok = new Token(TokenType.ILLEGAL, "");

    this.skipWhitespace();

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
        if (this.isLetter()) {
          tok.literal = this.readIdentifier();
          tok.type = tok.lookupIdentifier(tok.literal);
          return tok;
        } else if (this.isDigit()) {
          tok.literal = this.readNumber();
          tok.type = TokenType.INT;
          return tok;
        } else {
          tok = new Token(TokenType.ILLEGAL, "");
        }
        // todo

        break;
    }

    this.readChar();
    return tok;
  }

  isLetter(): boolean {
    if (!this.ch) return false;
    return ("a" <= this.ch && this.ch <= "z") ||
      ("A" <= this.ch && this.ch <= "Z") || this.ch === "_";
  }

  isDigit(): boolean {
    if (!this.ch) return false;
    return "0" <= this.ch && this.ch <= "9";
  }

  readIdentifier(): string {
    const prevPosition = this.position;
    while (this.isLetter()) {
      this.readChar();
    }
    return this.input.slice(prevPosition, this.position);
  }

  readNumber(): string {
    const prevPosition = this.position;
    while (this.isDigit()) {
      this.readChar();
    }
    return this.input.slice(prevPosition, this.position);
  }

  skipWhitespace() {
    while (
      this.ch === " " || this.ch === "\t" || this.ch === "\n" ||
      this.ch === "\r"
    ) {
      this.readChar();
    }
  }
}

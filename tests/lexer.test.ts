import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { Lexer } from "../src/mod.ts";
import { TokenType } from "../src/mod.ts";

const input1 = `=+(){},;\0`;

const expect1: Array<{ type: TokenType; literal: string }> = [
  { type: TokenType.ASSIGN, literal: "=" },
  { type: TokenType.PLUS, literal: "+" },
  { type: TokenType.LPAREN, literal: "(" },
  { type: TokenType.RPAREN, literal: ")" },
  { type: TokenType.LBRACE, literal: "{" },
  { type: TokenType.RBRACE, literal: "}" },
  { type: TokenType.COMMA, literal: "," },
  { type: TokenType.SEMICOLON, literal: ";" },
  { type: TokenType.EOF, literal: "" },
];

Deno.test({
  name: `testNextToken`,
  fn() {
    const lexer = new Lexer(input1);
    for (const { type, literal } of expect1) {
      const token = lexer.nextToken();
      assertEquals(token.type, type);
      assertEquals(token.literal, literal);
    }
  },
});

const input2 = `
let five = 5;
let ten = 10;
let add = func(x, y) {
    x + y;
};
let result = add(five, ten);\0`;

const expect2: Array<{ type: TokenType; literal: string }> = [
  { type: TokenType.LET, literal: "let" },
  { type: TokenType.IDENT, literal: "five" },
  { type: TokenType.ASSIGN, literal: "=" },
  { type: TokenType.INT, literal: "5" },
  { type: TokenType.SEMICOLON, literal: ";" },
  { type: TokenType.LET, literal: "let" },
  { type: TokenType.IDENT, literal: "ten" },
  { type: TokenType.ASSIGN, literal: "=" },
  { type: TokenType.INT, literal: "10" },
  { type: TokenType.SEMICOLON, literal: ";" },
  { type: TokenType.LET, literal: "let" },
  { type: TokenType.IDENT, literal: "add" },
  { type: TokenType.ASSIGN, literal: "=" },
  { type: TokenType.FUNCTION, literal: "func" },
  { type: TokenType.LPAREN, literal: "(" },
  { type: TokenType.IDENT, literal: "x" },
  { type: TokenType.COMMA, literal: "," },
  { type: TokenType.IDENT, literal: "y" },
  { type: TokenType.RPAREN, literal: ")" },
  { type: TokenType.LBRACE, literal: "{" },
  { type: TokenType.IDENT, literal: "x" },
  { type: TokenType.PLUS, literal: "+" },
  { type: TokenType.IDENT, literal: "y" },
  { type: TokenType.SEMICOLON, literal: ";" },
  { type: TokenType.RBRACE, literal: "}" },
  { type: TokenType.SEMICOLON, literal: ";" },
  { type: TokenType.LET, literal: "let" },
  { type: TokenType.IDENT, literal: "result" },
  { type: TokenType.ASSIGN, literal: "=" },
  { type: TokenType.IDENT, literal: "add" },
  { type: TokenType.LPAREN, literal: "(" },
  { type: TokenType.IDENT, literal: "five" },
  { type: TokenType.COMMA, literal: "," },
  { type: TokenType.IDENT, literal: "ten" },
  { type: TokenType.RPAREN, literal: ")" },
  { type: TokenType.SEMICOLON, literal: ";" },
  { type: TokenType.EOF, literal: "" },
];

Deno.test({
  name: `testNextToken2`,
  fn() {
    const lexer = new Lexer(input2);
    for (const { type, literal } of expect2) {
      const token = lexer.nextToken();
      assertEquals(token.type, type);
      assertEquals(token.literal, literal);
    }
  },
});

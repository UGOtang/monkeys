import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { Lexer } from "../src/mod.ts";
import { TokenType } from "../src/mod.ts";

const input = `=+(){},;\0`;

const tests: Array<{ type: TokenType; literal: string }> = [
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
    const lexer = new Lexer(input);
    for (const { type, literal } of tests) {
      const token = lexer.nextToken();
      assertEquals(token.type, type);
      assertEquals(token.literal, literal);
    }
  },
});

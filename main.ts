export function add(a: number, b: number): number {
  const vv = 1;
  console.log(vv);
  
  return a + b; 
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}

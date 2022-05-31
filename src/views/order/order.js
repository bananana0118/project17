import * as Api from "/api.js";

async function main() {
  console.log("posttest");

  const a = await Api.get("/api/order/testOrder", );
  console.log("post", a);
}

main();

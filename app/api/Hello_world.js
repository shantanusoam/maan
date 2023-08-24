import postgres from "postgres";

const conn = postgres();

function selectAll() {
  return conn.query("SELECT * FROM hello_world");
}
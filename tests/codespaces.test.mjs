import test from "node:test";
import assert from "node:assert/strict";
import {readOperatorJson,operatorFailure} from "../lib/operator/http.ts";

const env={CODESPACES:"true",CODESPACE_NAME:"walking-rally-test",GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:"app.github.dev"};
const forwarded="https://walking-rally-test-3000.app.github.dev";
const read=(origin,host)=>readOperatorJson(new Request("http://localhost:3000/api/operator/draft",{
 method:"POST",headers:{origin,host,"content-type":"application/json"},body:'{"test":true}',
}));
const forbidden=promise=>assert.rejects(promise,error=>operatorFailure(error).status===403);

test("only this Codespace's HTTPS origin can submit through its forwarded port",async()=>{
 const previous=Object.fromEntries(Object.keys(env).map(key=>[key,process.env[key]]));
 try{
  Object.assign(process.env,env);
  assert.deepEqual(await read(forwarded,"walking-rally-test-3000.app.github.dev"),{test:true});
  assert.deepEqual(await read(forwarded,"localhost:3000"),{test:true});
  await forbidden(read(forwarded,"unrelated.example"));
  for(const invalid of ["https://other-3000.app.github.dev",forwarded.replace("3000","3001"),forwarded.replace("https:","http:"),forwarded+".example.com"]){
   await forbidden(read(invalid,"localhost:3000"));
  }
  delete process.env.CODESPACES;
  await forbidden(read(forwarded,"localhost:3000"));
  assert.deepEqual(await read("http://localhost:3000","localhost:3000"),{test:true});
 }finally{
  for(const [key,value] of Object.entries(previous)){if(value===undefined)delete process.env[key];else process.env[key]=value;}
 }
});

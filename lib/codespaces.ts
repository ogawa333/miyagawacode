/** The single HTTPS origin forwarded to this Codespace's app on port 3000. */
export function codespacesOrigin(env=process.env):string|undefined{
 if(env.CODESPACES!=="true")return;
 const {CODESPACE_NAME:name,GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:domain}=env;
 if(!name||!domain||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)||!/^(?:[a-z0-9-]+\.)+[a-z0-9-]+$/.test(domain))return;
 return `https://${name}-3000.${domain}`;
}

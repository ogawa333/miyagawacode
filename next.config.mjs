import {codespacesOrigin} from "./lib/codespaces.ts";

const origin=codespacesOrigin();
export default origin?{allowedDevOrigins:[new URL(origin).hostname]}:{};

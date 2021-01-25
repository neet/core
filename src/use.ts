import { login } from './masto';

(async () => {
  const masto = await login();
  const acct = await masto.accounts.fetch('76721');
  console.log(acct.displayName);
})();

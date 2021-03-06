import { MastoAdmin } from 'masto';

(async () => {
  const admin = await MastoAdmin.login({
    uri: 'https://example.com',
    accessToken: 'TOKEN',
  });

  // Fetching reports
  const reports = await admin.fetchReports();

  // Disable an account of the 1st report
  await admin.actionAccount(reports[0].account.id, {
    type: 'disable',
    reportId: reports[0].id,
    text: 'Your account has been disabled'
  });
})();

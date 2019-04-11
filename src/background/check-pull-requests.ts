import { ChromeApi } from "../chrome";
import { GitHubState } from "../state/github";
import { getStore } from "../state/storage/store";

/**
 * Checks if there are any new pull requests and notifies the user when required.
 */
export async function checkPullRequests(chromeApi: ChromeApi) {
  let error;
  const github = new GitHubState(chromeApi, getStore(chromeApi));
  try {
    await github.load();
    if (!github.token) {
      return;
    }
    await github.refreshPullRequests();
    error = null;
  } catch (e) {
    error = e;
  }
  github.setError(error ? error.message : null);
}

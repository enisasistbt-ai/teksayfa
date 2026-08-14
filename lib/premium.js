export const TRIAL_DAYS = 7;

export function isEffectivelyPremium(profile) {
  if (!profile) return false;
  if (profile.is_premium) return true;
  if (profile.trial_ends_at && new Date(profile.trial_ends_at) > new Date()) {
    return true;
  }
  return false;
}

export function trialDaysLeft(profile) {
  if (!profile?.trial_ends_at) return 0;
  const ms = new Date(profile.trial_ends_at).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function isOnActiveTrial(profile) {
  return (
    !profile?.is_premium &&
    !!profile?.trial_ends_at &&
    new Date(profile.trial_ends_at) > new Date()
  );
}

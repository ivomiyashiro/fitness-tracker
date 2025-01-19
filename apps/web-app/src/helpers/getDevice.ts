export const getDevice = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const mobileRegex =
    /mobile|android|iphone|ipad|ipod|blackberry|opera mini|iemobile/;
  return mobileRegex.test(userAgent) ? "mobile" : "desktop";
};

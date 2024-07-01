const clientId = "86aue2n06v0823";
const clientSecret = "BXmRNc10zM2bQdvB";
const redirectUri = "http://localhost:3000/auth-linkedin-bridge";
const state = "linkedIn-auth-state-secret";
const scope = "profile openid email";

export const handleLinkedIn = () => {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
  window.location.href = authUrl;
};


const token =
  "AQWVIfjVW5TFz-17cWVvl-mwz-sGKuIvpPD67dquBbIzpihuz7cJbBtge4NOi-Z5zPfPyK2c142VqcWFvudUI8TCP17AZRRFinWQ4yJ3F3iLhIDX6t-qTlzc2G9RWIHgBgwLP9hKA9diXQ3-VfUDNNKGFmVR0x9HmqspBSzOEWcsG7l32jZokuwwg_T24ycdPNo9EatDhtWc8goYqyVmCVg5FuCe6_D7-UBBO-t10j86yxUs7amQyr2y6qWD_8_B2j0oP3Az_76JN75Ox_XM3axcIedv5QtNncWDFQaj3ltzTM2Ds47KIzmEis70_qiIFTesScSYCBNuYVm1993fBxjVvBLc2w";

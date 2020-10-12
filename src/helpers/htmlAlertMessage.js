export const htmlAlertMessage = (lstVerifcar) => {
  const retlistAlert = '<ul>' + lstVerifcar.map((item) => `<li>${item}</li>`) + '</ul>';
  return retlistAlert.replaceAll(',', '');
};

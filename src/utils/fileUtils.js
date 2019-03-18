import * as XLSX from 'xlsx';

export const formatXlsxToJson = (response) => {
  const data = new Uint8Array(response);
  const xlsxData = [];
  data.forEach((dataObj) => {
    xlsxData.push(String.fromCharCode(dataObj));
  });
  const updatedXlsxData = xlsxData.join('');
  const workbook = XLSX.read(updatedXlsxData, {
    type: 'binary',
  });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  return XLSX.utils.sheet_to_json(worksheet, {
    raw: true,
  });
};

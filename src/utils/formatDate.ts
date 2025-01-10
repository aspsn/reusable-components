import moment from "moment";

export const formatDate = (val: any, formatdate = "DD MMM YYYY") => {
  try {
    return moment(val).format(formatdate);
  } catch (error) {
    return "";
  }
};

export const formatDateReversed = (val: any, formatdate = "YYYY-MM-DD") => {
  try {
    return moment(val).format(formatdate);
  } catch (error) {
    return "";
  }
};

export const formatDateTime = (val: any, formatdate = "DD MMM YYYY HH:mm:ss") => {
  try {
    return moment(val).format(formatdate);
  } catch (error) {
    return "";
  }
};

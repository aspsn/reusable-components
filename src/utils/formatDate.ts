import moment from "moment";

export const formatDate = (val: Date | string, formatdate = "YYYY MM DD") => {
  return moment(val).format(formatdate);
};

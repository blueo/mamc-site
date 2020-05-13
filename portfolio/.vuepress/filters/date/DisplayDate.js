import { format, parseISO } from "date-fns";

/**
 * Filter for displaying dates
 * only accepts date-fns iso dates
 */
export default (Vue) => {
  Vue.filter("DisplayDate", function(value) {
    if (!value) return "";
    return format(parseISO(value), "E io 'of' LL 'at' h':'mm aaa");
  });
};

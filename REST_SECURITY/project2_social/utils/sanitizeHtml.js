const sanitizeHtml = require("sanitize-html");

module.exports = (content) => {
  return sanitizeHtml(content, {
    allowedTags: ["b","i","a"],
    allowedAttributes: { a: ["href"] }
  });
};

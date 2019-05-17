const fs = require('fs');

const getKeysFromOptions = (options) => {
  const { settings, _locals, ...objectKeys } = options;

  return Object.keys(objectKeys);
}

const getRenderedContent = (content, options) => {
  const keys = getKeysFromOptions(options);

  let contentString = content.toString();

  for (const key of keys) {
    contentString = contentString.replace(
      new RegExp(`\{${key}\}`, 'gi'),
      options[key]
    )
  }

  return contentString;
}

const engine = (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      return callback(err);
    }

    const rendered = getRenderedContent(content, options);

    return callback(null, rendered);
  })
};

module.exports = engine;
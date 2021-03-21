var base64_with_xor = require("../js/base64_with_xor");
var assert = require('assert');
var exec = require('child_process').exec;

describe('Base', function() {
  const source_text = "aaaaa";
  const password = "admin";
  describe('normal encode/decode', function() {
    it('should return true', function() {
        const encoded_text = base64_with_xor.encode(source_text);
        const decoded_text = base64_with_xor.decode(encoded_text);
        console.log(encoded_text);
        console.log(decoded_text);
        assert.equal(source_text, decoded_text);
    });
  });
  describe('encode/decode with xor', function() {
    it('should return true', function() {
        const encoded_text_with_xor = base64_with_xor.encode_with_xor(source_text, password);
        const decoded_text_with_xor = base64_with_xor.decode_with_xor(encoded_text_with_xor, password);
        assert.equal(source_text, decoded_text_with_xor);
    });
  });
});

describe('Tool', function() {
  describe('default', function() {
    it('show help', function() {
        exec('node ./tools/package_encrypted_html.js');
    });
  });
  describe('usage', function() {
    it('create out.html', function() {
        exec('node ./tools/package_encrypted_html.js -i ./tools/source.html -o ./tools/out.html -p root');
    });
  });
});
const {Base64} = require('js-base64');

var base64WithXOR = {
    encode: function (input) {
        return Base64.encode(input);
    },

    decode: function (input) {
        return Base64.decode(input);
    },

    encode_with_xor: function (input, key) {
        var pwd = this.encode(key)
        var xor_string = this._xor_handle(input, pwd);
        return this.encode(xor_string);
    },

    decode_with_xor: function (input, key) {
        var pwd = this.encode(key)
        var decode_string = this.decode(input);
        return this._xor_handle(decode_string, pwd);
    },

    _xor_handle: function (source, key) {
        var result = "";
        for (var i = 0; i < source.length; i++) {
            var source_char = source.charCodeAt(i);
            var key_idx = i % key.length;
            var xor_char_code = key.charCodeAt(key_idx) ^ source_char;
            result += String.fromCharCode(xor_char_code);
        }
        return result;
    },

}

module.exports = base64WithXOR;
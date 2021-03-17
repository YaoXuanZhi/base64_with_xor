var Base64WithXOR = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    encode: function (input) {
        var output = ""; var chr1, chr2, chr3, enc1, enc2, enc3, enc4; var i = 0; input = this._utf8_encode(input); while (i < input.length) {
            chr1 = input.charCodeAt(i++); chr2 = input.charCodeAt(i++); chr3 = input.charCodeAt(i++); enc1 = chr1 >> 2; enc2 = ((chr1 & 3) << 4) | (chr2 >> 4); enc3 = ((chr2 & 15) << 2) | (chr3 >> 6); enc4 = chr3 & 63; if (isNaN(chr2)) { enc3 = enc4 = 64; } else if (isNaN(chr3)) { enc4 = 64; }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    decode: function (input) {
        var output = ""; var chr1, chr2, chr3; var enc1, enc2, enc3, enc4; var i = 0; input = input.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++)); enc2 = this._keyStr.indexOf(input.charAt(i++)); enc3 = this._keyStr.indexOf(input.charAt(i++)); enc4 = this._keyStr.indexOf(input.charAt(i++)); chr1 = (enc1 << 2) | (enc2 >> 4); chr2 = ((enc2 & 15) << 4) | (enc3 >> 2); chr3 = ((enc3 & 3) << 6) | enc4; output = output + String.fromCharCode(chr1); if (enc3 != 64) { output = output + String.fromCharCode(chr2); }
            if (enc4 != 64) { output = output + String.fromCharCode(chr3); }
        }
        output = this._utf8_decode(output); return output;
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

    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n"); var utftext = ""; for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n); if (c < 128) { utftext += String.fromCharCode(c); }
            else if ((c > 127) && (c < 2048)) { utftext += String.fromCharCode((c >> 6) | 192); utftext += String.fromCharCode((c & 63) | 128); }
            else { utftext += String.fromCharCode((c >> 12) | 224); utftext += String.fromCharCode(((c >> 6) & 63) | 128); utftext += String.fromCharCode((c & 63) | 128); }
        }
        return utftext;
    },

    _utf8_decode: function (utftext) {
        var string = ""; var i = 0; var c = c1 = c2 = 0; while (i < utftext.length) {
            c = utftext.charCodeAt(i); if (c < 128) { string += String.fromCharCode(c); i++; }
            else if ((c > 191) && (c < 224)) { c2 = utftext.charCodeAt(i + 1); string += String.fromCharCode(((c & 31) << 6) | (c2 & 63)); i += 2; }
            else { c2 = utftext.charCodeAt(i + 1); c3 = utftext.charCodeAt(i + 2); string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)); i += 3; }
        }
        return string;
    }
}


// ------------------------------------------------------------------
// function test() {
//     var source_str = "source text"
//     var key = "your password"

//     // base64
//     var encode_str = Base64Plus.encode(source_str)
//     var decode_str = Base64Plus.decode(encode_str)
//     console.log(encode_str)
//     console.log(decode_str)

//     // base64 with xor
//     var encode_plus_str = Base64Plus.encode_with_xor(source_str, key)
//     var decode_plus_str = Base64Plus.decode_with_xor(encode_plus_str, key)
//     console.log(encode_plus_str)
//     console.log(decode_plus_str)
// }

// test()
// ------------------------------------------------------------------
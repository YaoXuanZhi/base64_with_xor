# 带异或加密的Base64库

如果你也有密钥访问需求，它将适合你

# 构建和运行

```sh
npm i
npm test
```

# 示例

```sh
const base64_with_xor = require("../js/base64_with_xor");
var source_str = "source text"
var key = "your password"

// base64
var encode_str = base64_with_xor.encode(source_str)
var decode_str = base64_with_xor.decode(encode_str)
console.log(encode_str)
console.log(decode_str)

// base64 with xor
var encode_plus_str = base64_with_xor.encode_with_xor(source_str, key)
var decode_plus_str = base64_with_xor.decode_with_xor(encode_plus_str, key)
console.log(encode_plus_str)
console.log(decode_plus_str)
```

详情请看`test.js`

## License

Shared under the MIT License
const fs = require('fs');
const base64_with_xor = require("../js/base64_with_xor");
const f = "test/xor_test.html";
const html_content = fs.readFileSync(f, 'utf8');

const pack_key = "yaoxuanzhi";
const split_str = "body";
const body_start = html_content.indexOf("<"+split_str+">");
const body_end = html_content.lastIndexOf("</"+split_str+">");
const html_body_content = html_content.substring(body_start, body_end+split_str.length+3);
const encoded_body_content = base64_with_xor.encode_with_xor(html_body_content, pack_key);
const decoded_body_content = base64_with_xor.decode_with_xor(encoded_body_content, pack_key);

const login_page_html = '\
<body class=\"text-center bg-light h-100\">\
\
    <form class=\"text-left mx-auto card p-4 w-100 p-2\" autocomplete=\"off\">\
        <h1 class=\"h3 mb-3 text-center\">请输入访问密码</h1>\
        <label for=\"password\">密码</label>\
        <input type=\"password\" id=\"password\" name=\"current-password\" autocomplete=\"current-password\" class=\"form-control rounded-right input-password\" spellcheck=\"false\" autocorrect=\"off\" autocapitalize=\"off\" required=\"\">\
        <button class=\"btn btn-lg btn-primary btn-block mt-3\" onclick=\"checkPassword()\">\
            验证\
        </button>'+
"\n<div id=\"encoded_text\" style=\"display:none;\">" + encoded_body_content + "</div>\n"+ 
"</body>";

const encoded_html_content = html_content.replace(html_body_content,  login_page_html);
// console.log(encoded_html_content);

const outFile = "encoded_html.html";
fs.writeFile(outFile, encoded_html_content, function(err, result) {
  if (err) throw err;
});
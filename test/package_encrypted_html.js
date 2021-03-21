const fs = require('fs');
const base64_with_xor = require("../js/base64_with_xor");

const argv = require('yargs')
    .usage('Usage: build_encode_html -i path -o out_file -p pwd')
    .example('build_encode_html -i "./test/template.html" -o "./encrypted_template.html -p admin"',
        'package html file to encrypted html file')
    .describe('i', 'input html path')
    .describe('o', 'input html path')
    .describe('p', 'input password')
    .default({p: 'admin'})
    .demandOption(['i', 'o'])
    .epilog('https://hub.fastgit.org/YaoXuanZhi/base64_with_xor.git copyright 2021')
    .argv;

// 提取html里面的html tag内容
function fetch_source_html_content(input) {
  const html_content = fs.readFileSync(input, 'utf8');
  const split_str = "html";
  const body_start = html_content.indexOf("<"+split_str+">");
  const body_end = html_content.lastIndexOf("</"+split_str+">");
  const html_body_content = html_content.substring(body_start, body_end+split_str.length+3);
  return html_body_content;
}

// 将源文本加密后塞到加密验证页面上
function package_encrypted_content(source_html, password) {
  const encrypted_template_content = fs.readFileSync('./test/encrypted_template.html', 'utf8');
  const encoded_content = base64_with_xor.encode_with_xor(source_html, password);
  const encoded_html_content = encrypted_template_content.replace("base64_text",  encoded_content);
  return encoded_html_content;
}

function main() {
  const inFile = argv.i;
  const outFile = argv.o;
  const password = argv.p;

  var source_html = fetch_source_html_content(inFile);
  var encrypted_html = package_encrypted_content(source_html, password);
  fs.writeFile(outFile, encrypted_html, function(err, result) {
    if (err) throw err;
  });
}

main();
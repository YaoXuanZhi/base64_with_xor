const fs = require('fs');
const base64_with_xor = require("../js/base64_with_xor");
const cheerio = require('cheerio');

const argv = require('yargs')
    .usage('Usage: build_encrypted_html -i path -o out_file -p pwd')
    .example('build_encrypted_html -i "./tools/template.html" -o "./encrypted_template.html -p admin"',
        'package html file to encrypted html file')
    .describe('i', 'input html path')
    .describe('o', 'input html path')
    .describe('p', 'input password')
    .default({p: 'admin'})
    .demandOption(['i', 'o', 'p'])
    .epilog('https://hub.fastgit.org/YaoXuanZhi/base64_with_xor.git copyright 2021')
    .argv;

// 将源文本加密后塞到加密验证页面上
function package_encrypted_content(source_html, password) {
  var dom = cheerio.load(source_html);
  var inner_encrypted_page_id = "inner-encrypted-page";

  // 在正文标签同级上插入一个加密节点
  var spec_blod_dom = dom('div[class="article-content"]');
  spec_blod_dom.parent().append('<div id="'+inner_encrypted_page_id+'"></div>');

  // 将正文标签转换成加密节点的子节点
  var replace_tag_dom = dom('div[id="'+inner_encrypted_page_id+'"]');
  spec_blod_dom.appendTo(replace_tag_dom);

  // 读取加密节点下的内容，将其进行base64加密处理，并且替换正文节点的outHtml
  var spec_blod_text = replace_tag_dom.html();
  const encoded_blod_content = to_encoded_text(spec_blod_text, password, inner_encrypted_page_id);
  spec_blod_dom.replaceWith(encoded_blod_content);
  return dom.root().toString();
}

// 加密指定文本，并塞入到验证div上，更新解密后被替换的div id
function to_encoded_text(spec_blod_text, password, inner_encrypted_page_id) {
  const encrypted_template_content = fs.readFileSync('./tools/encrypted_template_lite.html', 'utf8');
  const encoded_content = base64_with_xor.encode_with_xor(spec_blod_text, password);
  const encoded_blod_content = encrypted_template_content.replace("base64_text",  encoded_content).replace("spec_replace_id", inner_encrypted_page_id);
  return encoded_blod_content;
}

function main() {
  const inFile = argv.i;
  const outFile = argv.o;
  const password = argv.p;

  var source_html = fs.readFileSync(inFile, 'utf8');
  var encrypted_html = package_encrypted_content(source_html, password);
  fs.writeFile(outFile, encrypted_html, function(err, result) {
    if (err) throw err;
  });
}

main();
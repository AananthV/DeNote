import less from 'less';
import path from 'path';

export default (app: any) => {
  app.styleExtensions.push('.less');
  app.compilers['.less'] = lessCompiler;
};

const lessCompiler = (file: any, filename: any, options: any) => {
  var parser = new less.Parser({
    paths: [path.dirname(filename)]
    , filename: filename
    , syncImport: true
  });
  var out: any = {};
  parser.parse(file, function(err: any, tree: any) {
    if (err) throw err;
    out.css = tree.toCSS(options);
  });
  out.files = Object.keys(parser.imports.files).map(function(path) {
    return path;
  });
  out.files.push(filename);
  return out;
}
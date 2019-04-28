const fs = require("fs");
const { exec, execSync } = require("child_process");

const FILE_DATA = [];
const FAILURE_FILE_DATE = [];
const gitAddCommit = () => {
  FILE_DATA.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  }).forEach(({ filePath, title, date }) => {
    // TODO: FIXME: 标题不能出现半个引号，否则命令行出错终止（安全漏洞）
    execSync(
      `git add "${filePath}" && git commit -m "docs: ${title}" --date="${date}"`
    );
  });
};

// -u Untracked files 未跟踪的文件
exec("git status -u", { async: true }, (code, stdout, stderr) => {
  if (stderr) throw stderr;

  const set = new Set(stdout.trim().split("\n\t"));
  const files = [...set].filter(val => /\.md?$/.test(val) && val);

  files.forEach(filePath => {
    fs.readFile(filePath, function(err, data) {
      if (err) throw err;
      const regexp = new RegExp("\ntitle: (.*)\ndate: (.*)\n");
      const match = regexp.exec(data);
      const title = match[1];
      const date = match[2];

      if (title && date) {
        FILE_DATA.push({
          filePath,
          title,
          date
        });
      } else {
        FAILURE_FILE_DATE.push({
          filePath,
          title,
          date
        });
        console.log(filePath, title, date);
      }

      if (files.length === FILE_DATA.length + FAILURE_FILE_DATE.length) {
        gitAddCommit();
      }
    });
  });
});

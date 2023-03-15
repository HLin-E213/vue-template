## git 提交时的 commit 规则

```js
[
  "build", // 发布版本
  "chore", // 改变构建流程、或者增加依赖库、工具等
  "ci", // 持续集成修改
  "docs", // 文档修改
  "feat", // 新增功能
  "fix", // 修复缺陷
  "perf", // 优化相关，比如提升性能、体验
  "refactor", // 代码重构
  "revert", // 回退版本
  "style", // 样式修改
  "test", // 测试用例修改
];
```

> 提交（commit msg）示例

```

git commit -m "修复XXX" ×××
git commit -m "fix: 修复XXX" √√√

git commit -m "fix:" # ×××
git commit -m "fix: some message" # √√√

```

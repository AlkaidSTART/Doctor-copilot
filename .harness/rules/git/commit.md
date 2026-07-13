# 提交规范规则

## 提交格式

### 格式规范
```
<type>(<scope>): <description>

<body>

<footer>
```

### 类型（type）
- feat：新功能
- fix：Bug 修复
- docs：文档更新
- style：代码格式
- refactor：重构
- test：测试
- chore：构建/工具

### 范围（scope）
- 模块名（patient、care-plan、task）
- 文件名（login、dashboard）
- 功能名（api、ui、database）

### 描述（description）
- 使用祈使句
- 首字母小写
- 不超过 50 个字符

### 正文（body）
- 详细描述变更内容
- 使用空行分隔段落
- 不超过 72 个字符

### 页脚（footer）
- 关联 Issue：Closes #123
- 关联 PR：Related #456
- 破坏性变更：BREAKING CHANGE

## 提交类型详解

### feat
- 新功能开发
- 功能增强
- 功能改进

### fix
- Bug 修复
- 问题解决
- 错误修正

### docs
- 文档更新
- README 更新
- API 文档更新

### style
- 代码格式
- 空格调整
- 缩进调整

### refactor
- 代码重构
- 性能优化
- 代码清理

### test
- 新增测试
- 测试更新
- 测试修复

### chore
- 构建配置
- 依赖更新
- 工具配置

## 提交示例

### 简单提交
```
feat(patient): add patient search

Add search functionality to patient list page with support for name and ID filters.
```

### Bug 修复
```
fix(api): handle null patient data

Closes #123

Add null check for patient data in API response to prevent crash when patient is deleted.
```

### 重构提交
```
refactor(care-plan): improve code structure

- Extract care plan validation into separate function
- Improve error handling in care plan creation
- Add type definitions for care plan schema
```

### 文档更新
```
docs(api): update patient API documentation

Add detailed API documentation for patient endpoints with request/response examples.
```

## 提交规范检查

### 工具检查
- 使用 commitlint 检查提交格式
- 使用 husky 进行提交前检查
- 使用 pre-commit 钩子

### 审查检查
- 代码审查时检查提交格式
- 确保提交信息清晰
- 确保关联 Issue/PR

## 提交最佳实践

### 提交粒度
- 小步提交
- 每次提交一个逻辑变更
- 避免大提交

### 提交频率
- 每天至少提交一次
- 完成一个功能点提交一次
- 修复一个 Bug 提交一次

### 提交信息
- 描述清晰
- 使用英文
- 避免模糊描述

### 关联 Issue
- 使用 Closes #xxx 关闭 Issue
- 使用 Related #xxx 关联 Issue
- 使用 Fixes #xxx 修复 Issue

## 错误提交处理

### 修改提交信息
- 使用 git commit --amend 修改最近提交
- 使用 git rebase -i 修改历史提交

### 合并提交
- 使用 git rebase -i 合并提交
- 使用 git merge --squash 合并提交

### 撤销提交
- 使用 git revert 撤销提交
- 使用 git reset 重置提交
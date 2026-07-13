# 分支管理规则

## 分支策略

### 主分支
- main：生产环境分支
- develop：开发分支

### 功能分支
- feature/{feature-name}：新功能开发
- bugfix/{bug-name}：Bug 修复
- hotfix/{issue-name}：紧急修复
- refactor/{refactor-name}：重构

### 发布分支
- release/{version}：发布准备

## 分支命名规范

### 命名格式
- 使用 kebab-case
- 使用小写字母
- 使用连字符分隔单词
- 分支名清晰描述分支用途

### 分支类型
- feature：新功能开发
- bugfix：Bug 修复
- hotfix：紧急修复
- refactor：重构
- release：发布准备
- test：测试分支

### 命名示例
- feature/patient-management
- bugfix/login-error
- hotfix/api-timeout
- refactor/code-quality
- release/v1.0.0

## 分支生命周期

### 创建分支
- 从 develop 分支创建功能分支
- 从 main 分支创建 hotfix 分支
- 从 develop 分支创建 release 分支

### 分支开发
- 在功能分支上开发
- 定期提交代码
- 定期同步 develop 分支

### 代码审查
- 创建 Pull Request
- 代码审查通过
- CI/CD 构建成功

### 合并分支
- 功能分支合并到 develop
- hotfix 分支合并到 main 和 develop
- release 分支合并到 main 和 develop

### 删除分支
- 合并后删除功能分支
- 发布后删除 release 分支

## 工作流程

### 功能开发流程
1. 从 develop 创建 feature 分支
2. 在 feature 分支开发
3. 创建 PR 到 develop
4. 代码审查通过
5. 合并到 develop
6. 删除 feature 分支

### Bug 修复流程
1. 从 develop 创建 bugfix 分支
2. 在 bugfix 分支修复
3. 创建 PR 到 develop
4. 代码审查通过
5. 合并到 develop
6. 删除 bugfix 分支

### 紧急修复流程
1. 从 main 创建 hotfix 分支
2. 在 hotfix 分支修复
3. 创建 PR 到 main 和 develop
4. 代码审查通过
5. 合并到 main 和 develop
6. 删除 hotfix 分支

### 发布流程
1. 从 develop 创建 release 分支
2. 在 release 分支进行发布准备
3. 创建 PR 到 main 和 develop
4. 代码审查通过
5. 合并到 main 和 develop
6. 删除 release 分支

## 分支保护

### 保护规则
- main 分支：禁止直接推送，必须通过 PR
- develop 分支：禁止直接推送，必须通过 PR
- 代码审查：至少 1 人审查通过
- CI/CD：构建成功才能合并

### 权限控制
- 只有管理员可以合并到 main
- 开发人员可以推送功能分支
- 测试人员可以推送测试分支

## 分支冲突处理

### 冲突预防
- 定期同步 develop 分支
- 小步提交
- 避免长时间不合并

### 冲突解决
- 拉取最新代码
- 手动解决冲突
- 测试冲突解决后的代码
- 提交并推送

## 分支管理工具

### Git 命令
- git branch：管理分支
- git checkout：切换分支
- git merge：合并分支
- git rebase：变基

### GitHub 功能
- Pull Request：代码审查
- Branch Protection：分支保护
- Code Review：代码审查

### CI/CD 集成
- GitHub Actions：自动构建
- 代码审查检查
- 测试检查
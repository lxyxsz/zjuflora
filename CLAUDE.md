# 玉泉花草图鉴 - Claude Code 指引

## 工作流

每次完成代码修改后，**无需询问用户，直接**执行以下步骤：

1. `git add` 相关文件
2. `git commit` 提交（附上 Co-Authored-By 署名）
3. `git push origin main` 推送到 GitHub

远程仓库：https://github.com/lxyxsz/zjuflora.git，主分支为 `main`。

## 项目说明

浙大玉泉校区花草植物图鉴，PWA 应用，单文件为主（`index.html`）。

- 后端：Supabase（数据库 + Edge Functions）
- 植物识别：PlantNet API（通过 Supabase Edge Function 代理）
- 百科补充：中文/英文维基百科 API

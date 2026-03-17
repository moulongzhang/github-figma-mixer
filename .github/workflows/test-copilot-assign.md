---
on:
  workflow_dispatch:

permissions:
  contents: read
  issues: read

tools:
  github:
    toolsets: [default]

safe-outputs:
  create-issue:
    title-prefix: "[test] "
    labels: [test]
    close-older-issues: true
  assign-to-agent:
    allowed: [copilot]
  noop:

network: {}
---

# Copilot アサインテスト

このワークフローは `assign-to-agent` が正しく動作するかを検証するためのテストです。

## タスク

1. GitHub Issue を作成してください。タイトルは「Copilot アサイン動作確認」、本文は以下の通り:

```
## テスト結果
Copilot エージェントのアサイン機能が正常に動作しています。
このIssueは自動テストにより作成されました。
```

2. 作成した Issue に `assign_to_agent` ツールを使って Copilot をアサインしてください。

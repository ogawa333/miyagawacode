# 元リポジトリからの不足ファイル復元

- 実施日：2026-11-12
- 復元先：ogawa333/miyagawacode（開始時コミット `15adc35c507aaf858289a770a322470c7a6792c6`）
- 取得元：https://github.com/shotaciel5/MiuraWalkingRally/tree/feature/bundled-demo-data
- 取得元コミット：`3c2ee41`（feat: bundle portable demo courses and landmark assets）

Git管理対象のパスとblobを比較し、共通ファイルはすべて一致していることを確認した。
欠落していた89ファイル（lib配下48件、docs配下41件）だけを元コミットから無加工で復元した。
既存ファイル・依存バージョン・保存形式は変更していない。

## このMacでの実行

指定のNode.js 24.22.2（arm64）を公式配布のSHA-256照合後、Git対象外の `.tools/node-v24.22.2-darwin-arm64` へ配置した。
システムのNode.jsを変更せず、リポジトリのルートで次を実行する。

```sh
export PATH="$PWD/.tools/node-v24.22.2-darwin-arm64/bin:$PATH"
npm run dev
```

別の端末・新規cloneではREADME記載のNode.js/npmと `npm ci` を用意する。
実DB・取得キャッシュ・秘密情報・Node.js本体・node_modulesはGitへ含めない。

## 検証結果

- 復元先で `npm ci`、`npm test`：437件成功、失敗0件。
- 復元先で `npm run typecheck`：成功。
- 復元先で `npm run demo:seed`：初期コース2件と下書きを登録。
- iCloud配下の読み込み遅延を切り分けるため、一時フォルダの元コミットでも検証。
  `npm run typecheck`、`npm run build` と本番HTTPスモーク43件が成功。
- 画面の目視操作、現地確認、AWSデプロイは今回未実施。

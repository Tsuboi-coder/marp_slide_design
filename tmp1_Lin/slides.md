---
marp: true
theme: base-design
color: green
paginate: true
size: 16:9
---

<!-- _class: title -->

# Transformer入門
## ChatGPT の "T" を知る

横浜国立大学 坪井 一馬

---

<!-- _class: toc -->

# 目次

<!-- AUTO-TOC:START -->
- Transformerとは何か
- Attentionの考え方
- Transformerの構造
- まとめ
<!-- AUTO-TOC:END -->

---

<!-- _class: section -->

# SECTION 01
## Transformerとは何か

文章を理解する仕組みと，その基本的な考え方を理解する．

---

# Transformerとは何か

Transformerとは，文章中の単語同士の関係を捉えるためのニューラルネットワークのアーキテクチャである．

- 2017年に翻訳モデルとして提案されるが，画像生成等にも応用されるようになっている．
- Attention機構というメカニズムを中心に据える．
- 現在のLLMの基盤技術となっている．

---

<!-- _class: statement -->

# 単語を一つずつ見るのではなく、文章全体の関係を見る

Transformerを理解するための中心的な考え方

---

<!-- _class: section -->

# SECTION 02
## Attentionの考え方

文脈の中でどの単語に注目するべきかを重要度に基づいて考える，

---

# Attentionの考え方

以下の例文を理解するとき，どう考えるか？

> 私は昨日、**銀行**に行ってお金を下ろした。

「銀行」を理解するときは、「お金」や「下ろした」との関係に注目します。

---

<!-- _class: section -->

# SECTION 03
## Transformerの構造

入力された文章が処理される流れを整理します。

---

# Transformerの構造

## Input

文章をトークン列として入力する。

`I / like / chemistry`

## Transformer

Self-Attentionによって単語同士の関係を計算する。

---

<!-- _class: summary -->

# まとめ

- Transformerは単語同士の関係を捉える
- Attentionが文脈に応じた重要度を計算する
- 現在の大規模言語モデルを支える基盤技術である

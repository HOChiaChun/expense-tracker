# 記帳本


## 環境建置與需求 (prerequisites)

1. [Node.js](https://nodejs.org/en/) (LTS)


## 安裝與執行步驟 (installation and execution)

1. 終端機 下載專案

```
git clone https://github.com/HOChiaChun/expense-tracker.git
```

2. 終端機開啟專案資料夾

```
輸入 cd expense-tracker
```

3. 安裝 npm 套件

```
終端機輸入 npm install (package.json 已提供相對應需安裝的套件)
```

4. 下載mongodb

```
放進電腦根目錄資料下，並建立一個預存放data的資料夾,名為mongodb-data
在終端機輸入，./mongod --dbpath /Users/{yourname}/mongodb-data
，即可啟動資料庫。
```

5. 安裝Robo 3T 

```
create 一個 localhost 連結的位址為 localhost:27017
，並按下“Ｃonnect”，此時已啟動資料庫ＧＵＩ介面
```

6. 輸入指令建立種子資料

```
在終端機輸入 npm run seed，即可建立原始category資料進資料庫 
&
在終端機輸入 npm run trackerSeed，即可建立原始user與已有的帳目清單進資料庫
```

7. 安裝 nodemon 套件

```
終端機輸入 nodemon app.js 或 npm run dev 
```

8. 開啟程式

即啟動完成，可至 http://localhost:3000 進入首頁

## 功能描述 (features)

1. 首頁提供每一筆帳目縮表
4. 可新增新項目
5. 可編輯每一筆帳目相關資訊
6. 如有已顯示的帳目，可刪除
7. 加入註冊,登入,登出功能
8. 加入ＦＢ帳號登入功能
9. 加入關聯資料
10. 加入類別搜尋功能，可顯示出同一類別的消費總額
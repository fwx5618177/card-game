# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## Rule

1. 50油铸造一个nft卡牌，拥有卡牌即可参与游戏，游戏桌有7个位置，坐满7人，游戏自动开始
2. 系统会为每个人发放一个盲盒，默认最后一个加入的玩家支付矿工费开启所有人盲盒，每个盲盒有两个不同的结果，它会显示YES或者NO。
3. 每个人显示都不一样，统计7个人的结果，少数显示结果的人获胜，比如显示YES和NO结果是1:6，那么显示YES的人获胜，他将获得失败玩家的全部nft，每局比赛，一张n卡自动销毁到黑洞，剩下的卡片全部由获胜者获得或者由获胜者平分（当获胜者为2人或者3人时），nft卡牌实时分发给获胜者
4. nft卡牌可以随时回收变成油，回收手续费10%，回收手续费全部归邀请人所有，比如某人邀请了几十人，当天被邀请人共回收50个nft，则邀请人获得250油奖励，必须持有一个nft才可以获得邀请链接
5. 每局游戏回收的nft，会回收变成油，然后回购代币进行销毁，或者注入分红池


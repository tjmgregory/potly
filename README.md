# Potly

TrueLayer + Monzo integration to ensure you don't overspend on your credit cards 💳

But mainly, a project to deep dive into web development and all the tools involved.

**Planned features**

- Select which transactions should and shouldn't be moved to a pot
- Connect a partner's Monzo, declare how much of each transaction was whose, and have both have money moved.

**Roadmap**

- Stylish site ✅
- Dark mode ✅
- Login ✅
- Connect to TrueLayer 🔄
- View all your transactions 🔄
- Connect to Monzo 🔄
- Apportion split transactions 🔄

## Inspiriation

As a young person, I'm told repeateadly by elders that I should focus on my credit score, so that when (if ever!) I'm in the market to buy a house, the banks won't do me a dirty 🏦

A key component in building your score is ensuring that you **do not miss a payment**.

Now, clearly, to do this you must have the money to pay off your statement. Yet the purpose of a credit card is to pay with money that you don't yet have. *hmmmm* 🤔

So I'm thinking, if using my credit card impacted my debit card balance, it'd be tougher to overspend!

So spawns this tool - designed to maintain pots within your Monzo account(s) that you can withdraw from when the time comes to pay your bills 💸

## Documentation

- [Initial (outdated) RFCs of system design](https://drive.google.com/drive/folders/1F2I1wrt-ktIohBFUH62Ygdfm_BEbKWOf?usp=sharing).
- [Decision log](https://www.craft.do/s/jRtFvOz6WdaYtM)
- [Login flow](https://www.craft.do/s/I7f0Fdyq9Ywy9N)

## Tools

- Vercel https://vercel.com/
- Planetscale https://planetscale.com/
- NextJS https://nextjs.org/
- Node https://nodejs.org/en/
- TrueLayer Data API https://truelayer.com/data-api/
- Monzo API https://docs.monzo.com/
- Turborepo https://turborepo.org/

## Setup

1. Clone the repo.
2. `npm i -g yarn@1 vercel && yarn`
3. `vercel login && vercel link && vercel env pull`
4. Install [pscale cli](https://docs.planetscale.com/concepts/planetscale-environment-setup)
5. `pscale login`

### Starting the app

1. `pscale connect potly <yourbranch>`
2. `yarn dev`

### Updating the DB Schema

1. Create a planetscale branch off main `pscale branch create potly <branchname>`
2. Connect to the branch `pscale connect potly <branchname>`
3. Update [the Prisma schema](./website/prisma/schema.prisma)
4. Push your schema changes `yarn prisma db push`
5. Validate your changes work
6. Create a deploy request and add a link to it to your PR `pscale deploy-request create potly <branchname>
7. Merge branch and merge deploy request manually at the same time

# Potly

TrueLayer, Barclaycard &amp; Monzo integration to maintain a pot within Monzo equal to your current credit card balance.

## Inspiriation

As a young person, I'm told repeateadly by elders that the wisest thing I should focus on right now is getting an excellent credit score, so that when (if ever!) I'm in the market to buy a house, the banks will provide me a real good loan 🏦

A key component in building your score is ensuring that you **do not miss a payment**.

Now, clearly, to do this, you must have the money to pay off your statement. Yet the purpose of a credit card is to pay with money that you don't yet have. *hmmmm* 🤔

My ideal scenario is if I could treat my credit card like my debit card, then I would never over-spend, and will have the moeny to pay off my bill each month and build that score!

So spawns this tool - designed to maintain a pot within your Monzo account (with scope to expand to other banks/money holders) that holds the current statement balance of your credit card(s).

## Designs

RFCs documenting the design of the system can be found [here](https://drive.google.com/drive/folders/1F2I1wrt-ktIohBFUH62Ygdfm_BEbKWOf?usp=sharing).

## Tools

- AWS (Amazon Web Services) http://aws.amazon.com/
- AWS Lambda http://aws.amazon.com/
- Amazon DynamoDB http://aws.amazon.com/
- Node https://nodejs.org/en/
- TrueLayer Data API https://truelayer.com/data-api/
- Monzo API https://docs.monzo.com/

## Setup

To build the binaries for deployment, run the following:

```
yarn build
```

To deploy your built binaries to AWS, run the following:

```
yarn deploy
```

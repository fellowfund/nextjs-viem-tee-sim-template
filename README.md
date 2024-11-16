# FellowFund TEE-based Oracle using Phala Network

This repo was strongly based on the [nextjs-viem-tee-sim-template](https://github.com/Phala-Network/nextjs-viem-tee-sim-template) project.

## Requirements

- [Node](https://nodejs.org/en) >= v18.18
- [yarn](https://yarnpkg.com/)
- Docker or Orbstack

## Quickstart

Use docker-compose to bootstrap both the TEE Attestation Simulator and the FellowFund API backend to evaluate metrics, running within the TEE.

```
docker compose up -d
```

## Development

First, run the TEE Attestation Simulator:

```bash
docker run --rm -p 8090:8090 phalanetwork/tappd-simulator:latest
```

Next, download the dependencies with `yarn`

```shell
yarn
```

Build the docker image
```shell
docker build -t fellowfund-api:latest .
```

After the build is successful, run your docker image to connect to the TEE Attestation Simulator
> NOTE: Your docker image hash will be different than the one listed below.
```shell
docker run --rm -p 3000:3000 fellowfund-api:latest
```


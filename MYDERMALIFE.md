# MyDermaLife Login V2 fork

This repository is the full-history MyDermaLife fork of
[`zitadel/zitadel`](https://github.com/zitadel/zitadel). MyDermaLife owns only
the branded Login V2 application and the maintenance needed to keep it secure;
ZITADEL remains the identity provider and protocol authority.

## Compatibility baseline

| Item | Pinned value |
| --- | --- |
| Upstream release | `v4.17.2` |
| Upstream commit | `35aa213863395a73ee18dbfeae9a9ef41d6fff77` |
| Tested backend target | ZITADEL `v4.17.2` |
| Public route | `https://auth.stormbyva.com/ui/v2/login` |
| Integration branch | `develop` |
| Upstream remote | `https://github.com/zitadel/zitadel.git` |

The fork is intentionally complete. Login V2 depends on `apps/login`,
`packages/zitadel-client`, `packages/zitadel-proto`, `proto`, and the root Nx
and workspace configuration from one upstream revision. A standalone copy of
`apps/login` is not supported by the current upstream build graph.

## Package-manager exception

This repository is a narrow exception to the workstation's Bun default. The
upstream release declares pnpm in both the root and Login package manifests,
uses `pnpm-lock.yaml` and `pnpm-workspace.yaml`, invokes pnpm from Nx targets,
and documents pnpm as the reproducible build path. Replacing that toolchain
would turn the compatibility fork into a package-manager migration.

Use the upstream-declared Node, pnpm, and Nx versions here only. The Bun policy
continues to apply to the other MyDermaLife repositories.

## Change boundary

- Keep MyDermaLife changes in `apps/login` whenever possible.
- Preserve the Session API, OIDC proxy, auth-request URL context, cookies,
  redirects, organization policy, and server-action behavior.
- Change `packages/zitadel-client`, `packages/zitadel-proto`, or `proto` only
  when a reviewed Login API contract requires it, and keep them on the same
  upstream revision.
- Product membership and permissions stay in MyDermaLife services. A successful
  ZITADEL login is authentication, not product access.
- Patient registration follows the Patient organization policy. Professional,
  Store, and Internal access remains invitation/admin provisioned unless the
  owning policy is deliberately changed.
- Never commit PATs, private keys, client secrets, cookies, or `.env.*.local`.

The pre-code experience contract is in
[`docs/design-research/2026-09-19-mydermalife-login-v2.md`](docs/design-research/2026-09-19-mydermalife-login-v2.md).

## Local verification

From the repository root, after using the versions declared by upstream:

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm nx run-many \
  --projects @zitadel/login @zitadel/client @zitadel/proto \
  --targets lint build test
```

When proto definitions change, run `pnpm nx run @zitadel/proto:generate`
before the dependent checks. Authentication-flow changes also require staging
proof for authorization code with S256 PKCE, enabled human methods, account
selection, registration policy, verification/recovery, explicit logout,
organization branding, French and English, invalid/expired input, and desktop
plus mobile browsers.

GitHub Actions are disabled on the fork. Verification runs locally or on an
explicitly approved self-hosted runner; merging must not depend on paid hosted
Actions.

## Upstream update and release

1. Read the target ZITADEL release notes and security notices.
2. Fetch tags from `upstream` and create an update branch from the current
   customized `develop`.
3. Merge the selected release tag without squashing its upstream ancestry.
4. Review Login, client, proto, and root-build deltas together.
5. Install, generate, lint, test, build, and exercise the staging actor matrix.
6. Build an immutable image such as `v4.17.2-mdl.1` and record the fork commit,
   image digest, backend compatibility, and known limitations.
7. Promote through GitOps only after runtime and actor proof; retain the prior
   image digest and configuration for rollback.

Do not merge upstream continuously, force-push long-lived branches, use a
mutable `latest` image, or enable Login V2 instance-wide before a per-application
canary proves login, callback, logout, recovery, and expected denial.

## Official maintenance sources

- [Maintain and deploy a customized Login UI](https://zitadel.com/docs/guides/integrate/login-ui/fork-and-deploy-login-app)
- [Login App architecture](https://zitadel.com/docs/guides/integrate/login-ui/login-app)
- [Adopt Login V2 on an existing installation](https://zitadel.com/docs/self-hosting/manage/adopt-login-v2)

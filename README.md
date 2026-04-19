# wikisubmission-org

Source code repository for [https://wikisubmission.org](https://wikisubmission.org).

## Local Setup

Clone the repository:

```zsh
git clone git@github.com:wikisubmission/wikisubmission-org
```

Install dependencies using `pnpm`:

```zsh
pnpm install
```

Launch the application ([http://localhost:3000](http://localhost:3000)):

```zsh
pnpm dev
```

## Auth Setup

This branch uses Supabase SSR auth in Next.js.

Required environment variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_API_URL`

Optional auth flags:

- `SUPABASE_EMAIL_CONFIRM=true` to require email confirmation before activation
- `SUPABASE_OAUTH_ENABLED=false` to disable all social sign-in buttons
- `SUPABASE_AUTH_GOOGLE_ENABLED=true` to show and enable Google SSO
- `SUPABASE_AUTH_APPLE_ENABLED=true` to show and enable Apple SSO

Google and Apple buttons are rendered only when their provider flag is enabled and `NEXT_PUBLIC_SITE_URL` is configured, so incomplete setups stay hidden from users.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

Email: [developer@wikisubmission.org](mailto:developer@wikisubmission.org)

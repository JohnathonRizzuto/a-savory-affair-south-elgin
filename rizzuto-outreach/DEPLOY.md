# How Rizzuto Outreach is deployed

Live at **https://rizzuto-outreach.vercel.app**
Vercel project: `rizzuto-outreach` (team `rizzuto`)

## How it works

The Vercel project is not connected to a Git repo. Its deployment holds a single
`package.json`, and the build pulls this folder's source from GitHub, then runs
the generator:

```json
{
  "scripts": {
    "build": "curl -sL -o src.tgz https://codeload.github.com/JohnathonRizzuto/a-savory-affair-south-elgin/tar.gz/refs/heads/claude/fervent-noether-yus1ex && tar xzf src.tgz --strip-components=1 && node rizzuto-outreach/build-site.js ../dist"
  }
}
```

Project settings:

| Setting | Value |
|---|---|
| Framework | None |
| Install command | `echo no-deps` |
| Build command | `npm run build` |
| Output directory | `dist` |

This works because `a-savory-affair-south-elgin` is a **public** repo, so the
build can fetch the tarball with no token.

## Publishing a change

1. Edit `build-site.js` (copy, towns, services) or `assets/site.css`.
2. Run `node build-site.js` to regenerate the pages in place, and commit them.
3. Push to the branch named in the build command above.
4. Redeploy the Vercel project so the build re-pulls the branch.

Step 4 is the manual part: a push alone does not trigger a rebuild, because the
project has no Git connection.

## Worth fixing when there's time

- **The build is pinned to the `claude/fervent-noether-yus1ex` branch.** If that
  branch is merged and deleted, the next rebuild fails. Point the URL at
  `refs/heads/master` once the work lands there.
- **Better: move this folder to its own repo and connect it to the Vercel
  project.** Then every push deploys itself and steps 3-4 collapse into one.
- The site should get a real domain instead of `rizzuto-outreach.vercel.app`.

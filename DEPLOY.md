# How to deploy this site yourself

**The one rule: `master` is live.** Anything pushed to the `master` branch on
GitHub is on the real website about 30 seconds later. Nothing else deploys.
No Vercel CLI, no `vercel --prod`, no terminal required for a normal change.

---

## Part 1 - One-time setup

Four things, done once. After this you never touch them again.

### [ ] 1. Rename the Vercel project

Right now the project is still named after an old demo client.

1. Go to https://vercel.com/rizzuto
2. Click the project **a-savory-affair-south-elgin**
3. **Settings** -> **General** -> **Project Name**
4. Change it to `sandwich-sports-boosters` -> **Save**

This changes the temporary `.vercel.app` address. Do it BEFORE you give the
link to anybody, because the old address stops working the moment you save.

### [ ] 2. Rename the GitHub repo

1. Go to https://github.com/JohnathonRizzuto/a-savory-affair-south-elgin
2. **Settings** -> **Repository name**
3. Change it to `sandwich-sports-boosters` -> **Rename**

GitHub forwards the old address automatically, and Vercel tracks the repo by
its internal ID, so the deploy connection does not break.

**One thing does break:** the visual editor has the repo name written into it.
After renaming, open `src/editor-fragment.html`, find this line near the top:

    var GH_REPO = 'a-savory-affair-south-elgin';

change it to:

    var GH_REPO = 'sandwich-sports-boosters';

then run the build and push (see Part 2B below). Until you do that, the Save
button in the visual editor will fail.

### [ ] 3. Attach the domain

1. Vercel -> the project -> **Settings** -> **Domains**
2. **Add** -> type `sandwichsportsboosters.com` -> **Add**
3. Add `www.sandwichsportsboosters.com` too, and choose **Redirect to
   sandwichsportsboosters.com**

Because the domain was bought through Vercel, the DNS fills itself in and the
SSL certificate issues on its own. Give it a few minutes, then load
https://sandwichsportsboosters.com in a private browser window.

### [ ] 4. Get the repo onto your PC

Only needed for Part 2B (real edits). In PowerShell:

    cd C:\Users\johnn
    git clone https://github.com/JohnathonRizzuto/sandwich-sports-boosters
    cd sandwich-sports-boosters

(If you have not renamed the repo yet, use the old name in that URL.)

---

## Part 2 - Making changes

There are two ways. Pick based on where you are.

### 2A. Quick change from your phone - the visual editor

Use this when you are standing in front of someone: fixing a typo, swapping a
photo, adding a sponsor name.

1. [ ] Open the page you want to change and add `?edit=jb2026` to the end of
       the address. Example:
       `https://sandwichsportsboosters.com/sponsorship.html?edit=jb2026`
2. [ ] First time only: it asks for a GitHub token. Paste your fine-grained
       personal access token with **Contents: Read and write** on this repo.
       It saves in the browser, so you only do this once per device.
3. [ ] Tap any text to edit it. Tap an image to swap it.
4. [ ] Hit **Save**.
5. [ ] Wait about 30 seconds, then reload the page WITHOUT `?edit=jb2026`.

That is the whole flow. Save pushes straight to `master` and Vercel redeploys.

**Careful:** the editor writes to the finished page files. If you later run a
build on your PC (Part 2B), it overwrites them and your phone edits disappear.
So after any editor session, either keep working in the editor, or copy that
change into the matching file in `src/pages/` before you build again.

### 2B. Real change from your PC - edit, build, push

Use this for anything structural: new section, layout change, new page,
anything involving the header, footer, or styles.

1. [ ] Get the latest first - this matters if you used the phone editor since
       you last worked on the PC:

           git pull

2. [ ] Edit the files in the `src` folder. **Never edit the `.html` files in
       the main folder** - those are generated and get overwritten.

       | What you want to change | File to open |
       |---|---|
       | Words on a page | `src/pages/<page>.html` |
       | Colors, fonts, spacing, anything visual | `src/shell.css` |
       | Top menu bar | `src/header.tpl.html` |
       | Footer and the contact popup | `src/footer.tpl.html` |
       | Page titles, Google descriptions | `src/build.py` |
       | Add a sponsor logo | drop a 480x360 image in `img/sponsors/`, then link it in `src/pages/sponsorship.html` |

3. [ ] Build it:

           python3 src/build.py

       It prints all seven pages with their sizes. That is your confirmation.

4. [ ] Look at it before anyone else does - open `index.html` from the folder
       by double-clicking it.

5. [ ] Ship it:

           git add -A
           git commit -m "Update sponsorship page"
           git push origin master

6. [ ] Wait about 30 seconds and reload the live site.

---

## Part 3 - Confirm it actually went live

1. [ ] Go to https://vercel.com/rizzuto -> the project -> **Deployments**
2. [ ] Top entry should say **Ready** and **Production**, with your commit
       message next to it
3. [ ] Load the live site in a **private/incognito window** - a normal window
       will show you the old cached version and make you think it failed

---

## Part 4 - When something goes wrong

**The site did not change.**
Check Deployments in Vercel. If the top entry is older than your push, the push
did not land - run `git status` and make sure you actually committed. If the top
entry is **Error**, click it and read the log.

**The visual editor's Save button fails.**
Almost always one of three things: the GitHub token expired, the token does not
have Contents write permission on this repo, or you renamed the repo and did not
update `GH_REPO` (Part 1 step 2).

**I edited a page and the build wiped it out.**
You edited a generated file in the main folder instead of the matching file in
`src/pages/`. Recover it with `git log` / `git show`, then redo the change in
`src/pages/` and rebuild.

**I need to undo the last change.**

    git revert HEAD
    git push origin master

That publishes the previous version. It does not erase history, so nothing is
lost and you can revert the revert.

**Emergency: take the site down right now.**
Vercel -> project -> **Settings** -> scroll to the bottom -> **Pause Project**.
It serves a blank page until you unpause. Nothing is deleted.

---

## Things not to do

- Do not edit the `.html` files in the main folder by hand.
- Do not run `vercel --prod` from `C:\Users\johnn` - that tries to publish your
  entire home directory. You never need the Vercel CLI for this site at all.
- Do not push to any branch other than `master` expecting it to go live.
  Other branches build a private preview URL, not the real site.

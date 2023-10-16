## CASA-MYRNA
## Git Do's and Don'ts
*DON'T 
  - UNDER NO CIRCUMSTANCES mess with the branch named "main" => your default should be the dev branch
  - don't push to dev directly, you should be working on a different branch as dev will be the branch we push our most up to date code to
  - don't handle merge conflicts without Elizabeth or Nishika being present
  - don't be afraid if you have made a git mistake!! ultimately, the whole purpose of git is to save our work consistently to prevent disasters, so more likely than not, any git mistakes can be fixed! reach out to Nishika if this does happen and she will help!

*Do
  - make git commits locally often! saving your work consistently with git will tremendously help if there are any issues/conflicts with code down the road.
  - if you need to create a new branch, run these git commands:
  -   ```git
      git checkout dev
      # makes sure that you are currently on the dev branch
      git pull # never hurts to pull
      git checkout frontend #change "frontend" to "backend" if you are a backend dev
      git pull # never hurts to pull
      git merge dev # merges finalized code from dev branch onto your current local branch
      git branch [frontend or backend]-[ticket #]-ticket-title # creates the new branch
      ** make changes to the file (for next week, you'll change files to create a button **
      git add . # adds ALL the files you edited to the stage
      git commit -m "[insert your message]" # saves your changes to your local branch
      git push # pushes your changes to github ```
  - If you have just begun a coding session after a few days, run the following git commands:
      ```git
    git pull  
    git checkout [curr_branch]
    git merge dev
    ```
  - If you see on github that the current branch you're on is behind the dev branch:
    ```git
    git checkout [curr_branch]
    git merge dev
    ```
    This will merge everything from the dev branch onto your current branch. 
  - If you have just finished editing a few files, and would only like to set a SINGLE file to the stage:
    ```git
    git add [filename]
    ```
  - If you would like to add all of the files you edited to the stage:
    ```git
    git add .
    ```
  - If you have added files to the stage and would like to commit them to the stage:
    ```git
    git commit -m "[insert message here]"
    ```
  - If you have made commits to your local branch and would like to push to github:
    ```git
    git push
    ```
## Our Tech Stack
- [React](https://react.dev/) - frontend
- [Typescript](https://www.typescriptlang.org/) - frontend/backend
- [Next.js](https://nextjs.org/learn/foundations/about-nextjs/what-is-nextjs) - frontend/backend
- [PostgreSQL](https://www.postgresql.org/about/) - database
- [Prisma](https://www.prisma.io/docs/concepts/overview/what-is-prisma) - to communicate with database
  ![image](https://github.com/JumboCode/casa-myrna/assets/87954052/baa1f6aa-dc7d-4681-9428-0ca3fd0b5b67)
- [Clerk](https://clerk.com/docs?utm_source=www.google.com&utm_medium=referral&utm_campaign=none) - gives us components for login authentication 

  
## How does our tech stack flow with each other? (resources)
- [Best Practices for a React/Next.js webapp](https://blogs.perficient.com/2023/04/25/best-practices-for-building-and-sustaining-a-clean-react-next-js-project/)
- [Example guide on how our entire tech stack will interact with each other](https://vercel.com/guides/nextjs-prisma-postgres) (some of this is not relevant to our tech stack, like github authentication, vercel database hosting, etc.)
## Code Conventions
  * We will not be accepting code without any comments!!
      - Functions should have a description of what it does
      - large loops or code with a lot of logic should have a description as well
  * Use camelCase instead of underscores for variable names or filenames
  * Since you will be working on a separate branch from our dev branch, you will need to submit pull requests (PRs) along with your testing process.
  * Since you will be working on a separate branch from our dev branch, we will also be using a naming convention for the branches:
    ```
    [frontend or backend]-[ticket#]-ticket-title
    ``` 
      - For example, say I am a frontend developer working on ticket #45 whose title is "creating profile page", my branch will be named `frontend-45-creating-profile-page`

## WEB APP INFO
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


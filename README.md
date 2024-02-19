## CASA-MYRNA
## PR EXAMPLE
Developer: Elizabeth Foster
Dates: October 15th - October 15th
Time spent: 1 hour

Summary
Update from "hello" to "hi" in page.tsx file

Testing

 - Before: Screenshot 2023-10-15 at 6 24 58 PM

 - After: Screenshot 2023-10-15 at 7 06 18 PM

Reflection
Ran into some unexpected git branch errors, but they got resolved! Also learned about the .env.local file ( thank you Nishika for explaining <3 )
## Git Do's and Don'ts
Don't:

Avoid making direct changes to the "main" branch under any circumstances. Always prioritize working on the "dev" branch as your default.
Refrain from pushing changes directly to the "dev" branch. It's essential to work on feature branches instead.
After completing each task, create a pull request (PR) to merge your changes into the appropriate branch.
Do:

Commit your changes frequently. Regular commits help in saving your work consistently, making it easier to manage and resolve any potential issues or conflicts later on.
When creating a new branch, follow these steps:
Ensure you're on the "dev" branch by checking out to it.
Pull the latest changes from the remote repository to stay up-to-date.
Switch to the relevant branch ("frontend" or "backend").
Merge the latest changes from the "dev" branch into your current local branch.
Create a new branch with a descriptive name, typically including the ticket number and a brief title.
Make necessary changes to the files.
Add all edited files to the staging area using "git add .".
Commit your changes with a descriptive message using "git commit -m".
Push your changes to the remote repository using "git push".
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


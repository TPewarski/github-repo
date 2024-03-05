## Running the Application

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technical Choices

This application uses NextJS for it's foundation. NextJS is a best in class React framework with many out of the box features utilizing the latest React version.

I chose NextJS for this project for it's ease of configuration and data caching functionalities. Users are able to switch back and forth through the repository list without having to wait for requests for views they have already loaded. Developers are able to utilize utilities like Typescript, Tailwind and Jest with virtually zero configuration.

I used Tailwind for component styling. Tailwind is helpful for small applications such as this one because it provides common built in classes and style tokens allowing developers to move quickly. Using Tailwind virtually eliminates dead css that tends to accumulate in modules. The trade off with tailwind is that lists of classes on components tend to be more verbose than utilizing modules.

## New Features

Possible enhancements for this application would be to display issues and pull requests for the repositories we are querying. This would allow the user to stay up to date with new developments in the repositories or organizations that care about.

If we were to add a backend we could also add features such as favoriting repositories or organizations to quickly access them in the future.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

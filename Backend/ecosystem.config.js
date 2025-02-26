module.exports = {
  apps: [
    {
      name: "interview-prep-api",
      script: "main.ts",
      interpreter: "deno",
      args: "run --allow-all",
      env: {
        PORT: 3000,
      },
    },
  ],
};

# 🚀 How to Deploy to GitHub Pages

You are fully set up to host this simulation live.

## Step 1: Create the Repo
1.  Go to **GitHub.com** and create a new repository named:
    `JB-Energy-Pilot`
    *(Make it Public so investors can see it)*.

## Step 2: Push the Code
Open your terminal in this folder (`simulation_viz`) and run these 3 commands:

```bash
git init
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/JB-Energy-Pilot.git
git add .
git commit -m "Initial Deploy"
git push -u origin main
```

*(Note: Replace `YOUR_GITHUB_USERNAME` with your actual username)*.

## Step 3: Go Live
One command to build and deploy:

```bash
npm run deploy
```

Wait 2 minutes. Your site will be live at:
**https://YOUR_GITHUB_USERNAME.github.io/JB-Energy-Pilot/**

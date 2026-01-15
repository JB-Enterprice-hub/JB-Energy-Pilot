# 🚀 How to Deploy to GitHub Pages

You are fully set up to host this simulation live.

## Step 1: Create the Repo
1.  Go to **GitHub.com** and create a new repository named:
    `JB-Energy-Pilot`
    *(Make it Public so investors can see it)*.

## Step 2: Push the Code
Open your PowerShell terminal and COPY-PASTE this entire block:

```powershell
# 1. Enter the Project Folder
cd "C:\Users\oleja\OneDrive\Desktop\Website coding\JB-Enterprice\energy_pilot\simulation_viz"

# 2. Connect to GitHub
git remote remove origin
git remote add origin https://github.com/JB-Enterprice-hub/JB-Energy-Pilot.git

# 3. Push Code
git push -u origin main
```

## Step 3: Go Live
To bypass Windows Script Security, run this command:

```powershell
PowerShell -ExecutionPolicy Bypass -Command "npm run deploy"
```

Wait 2 minutes. Your site will be live at:
**https://YOUR_GITHUB_USERNAME.github.io/JB-Energy-Pilot/**

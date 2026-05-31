const { execSync } = require('child_process');

try {
    const gitLog = execSync('git log --pretty=format:"%an|%ae|%ad" --date=short').toString();
    const commits = gitLog.split('\n').filter(Boolean);
    
    console.log(`[+] Total commits analyzed: ${commits.length}`);
    
    const stats = {};
    commits.forEach(c => {
        const [name, email, date] = c.split('|');
        if (!stats[name]) stats[name] = 0;
        stats[name]++;
    });
    
    console.log("\n=== Commit metrics by contributor ===");
    for (const [author, count] of Object.entries(stats)) {
        console.log(`- ${author}: ${count} commits`);
    }
} catch (e) {
    console.log("[-] Error running git log parser. Ensure this is a valid git repository.");
}
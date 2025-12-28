git add .
git commit -m "deploy"
git push origin main
# ssh into server with password
sshpass -p 'IndiaI$gr89' ssh 65002 u149465224@157.173.216.16 "cd domains/biloo.dashandots.com/public_html/ && git clone origin main"

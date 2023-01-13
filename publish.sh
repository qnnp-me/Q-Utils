#
# Copyright (c) 2023. qnnp <qnnp@qnnp.me> https://qnnp.me
#

git commit -a -m "publish version $1"
git push origin dev --tags
git checkout main
git merge dev
git push origin main --tags
npm version $1
npm publish
git push origin main --tags
git checkout dev

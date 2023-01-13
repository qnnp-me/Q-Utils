#
# Copyright (c) 2023. qnnp <qnnp@qnnp.me> https://qnnp.me
#

git add .
git commit -a -m "publish version $1"
git push origin dev --tags
git checkout main
git merge -m "Merge branch 'dev' for publish version $1" dev
git push origin main --tags
npm version $1
npm publish
git push origin main --tags
git checkout dev

#
# Copyright (c) 2023. qnnp <qnnp@qnnp.me>
#

git checkout main
git push origin main --tags
npm version $1
npm publish
git push origin main --tags

#
# Copyright (c) 2023. qnnp <qnnp@qnnp.me>
#

git branch -M main
git push origin main --tags
npm version $1
npm publish
git push origin main --tags

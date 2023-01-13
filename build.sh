#
# Copyright (c) 2023. qnnp <qnnp@qnnp.me>
#

find -E ./src/types -regex '.*\.ts$' | perl -pe 's/(\.\/src\/)(.*)/\/\/\/ <reference path="$2" \/>/g' > src/index.ts
rm -rf dist types
tsc --build
cp js/Multipart.min.js dist/utils
rm -rf dist/types types/utils

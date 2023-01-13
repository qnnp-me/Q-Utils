#
# Copyright (c) 2023. qnnp <qnnp@qnnp.me> https://qnnp.me
#

echo "Do you wish to publish $1?"
select yn in "Yes" "No"; do
  case $yn in
  Yes)
    printf "==========testing...\n"
    test=$(tsc --noEmit)
    if [ "$test" != "" ]; then
      printf "==========test error\n"
      printf "%s\n" "$test"
      exit
    fi
    printf "==========test success"
    php build.php
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
    break
    ;;
  No)
    printf 'Bye.'
    exit
    ;;
  esac
done

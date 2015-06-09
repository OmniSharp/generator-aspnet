
# You can use this script to manually test the yeoman generators.
# There are some issues in this script (indicated by TODOs below)


# upgrade to the latest released kvm
KRE_FEED=https://www.nuget.org/api/v2
TESTDIR=~/tmp-yotest

export KRE_FEED="$KRE_FEED"
echo 'Deleting packages folder at ~/.kpm/packages/'
rm -r -f ~/.kpm/packages/
source kvm.sh

echo 'installing kvm beta3'
kvm install 1.0.0-beta3 -p
kvm list

if [ -d $TESTDIR ]
then
    echo "Deleting directory at [$TESTDIR]"
    rm -r -f $TESTDIR
fi

echo 'Creating directory at $TESTDIR'
mkdir $TESTDIR

pushd $TESTDIR

# TODO: Figure out how to pass params to yo to avoid user interaction here
echo '>>> Create a default Empty app'
yo aspnet
pushd EmptyApplication
kpm restore
kpm build
popd

echo '>>> Create a default Console app'
yo aspnet
pushd ConsoleApplication
kpm restore
kpm build

# TODO: When running the script I get a sharing violation, not sure why
# but you can see Hello World was printed to the console
echo '>>> Running k run, press ENTER to quit'
k run
popd

echo '>>> Create a default Web app'
yo aspnet
pushd WebApplication
kpm restore
kpm build

# TODO: When running kestrel users cannot enter input so kestrel cannot be stopped
# echo '>>> Running k run, press Q then ENTER to quit'
# k kestrel
popd

# TODO: Replace with Web API Test
#echo '>>> Create a default MVC app'
#yo aspnet
#pushd MvcApplication
#kpm restore
#kpm build

# TODO: When running kestrel users cannot enter input so kestrel cannot be stopped
# echo '>>> Running k run, press Q then ENTER to quit'
# k kestrel
#popd

echo '>>> Create a default Web API app'
yo aspnet
pushd WebAPIApplication
kpm restore
kpm build

# TODO: When running kestrel users cannot enter input so kestrel cannot be stopped
# echo '>>> Running k run, press Q then ENTER to quit'
# k kestrel
popd

#echo '>>> Create a default Nancy app'
#yo aspnet
#pushd NancyApplication
#kpm restore
#kpm build

# TODO: When running kestrel users cannot enter input so kestrel cannot be stopped
# echo '>>> Running k run, press Q then ENTER to quit'
# k kestrel
#popd

echo '>>> Create a default Class library project'
yo aspnet
pushd ClassLibrary
kpm restore
kpm build
popd

#echo '>>> Create a default Unit test project'
#yo aspnet
#pushd UnitTest
#kpm restore
#kpm build
#popd

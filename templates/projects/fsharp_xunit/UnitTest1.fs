namespace <%= namespace %>
open Xunit;


// see example explanation on xUnit.net website:
// https://xunit.github.io/docs/getting-started-dotnet-core.html
module UnitTest1 =

    let add x y = x + y

    [<Fact>]
    let PassingTest () =
        Assert.Equal(4, (add 2 2));

    [<Fact>]
    let FailingTest () = 
        Assert.Equal(5, (add 2 2));

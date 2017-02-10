// Learn more about F# at http://fsharp.org

open System
open System.IO
open Microsoft.Extensions.Configuration
open Microsoft.AspNetCore.Hosting

open <%= namespace %>

[<EntryPoint>]
let main argv =

    let config = ConfigurationBuilder()
                    .AddCommandLine(argv)
                    .AddEnvironmentVariables("ASPNETCORE_")
                    .Build()

    let host = WebHostBuilder()
                    .UseConfiguration(config)
                    .UseKestrel()
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .UseIISIntegration()
                    .UseStartup<Startup>()<% if(includeApplicationInsights){ %>
                    .UseApplicationInsights()<% } %>
                    .Build()
    host.Run();

    0 // return an integer exit code

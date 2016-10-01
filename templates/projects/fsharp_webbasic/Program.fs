open System
open System.Collections.Generic
open System.IO
open System.Linq
open System.Threading.Tasks
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Configuration
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
                    .UseStartup<Startup>()
                    .Build()

    host.Run()
    0

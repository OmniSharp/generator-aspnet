open System
open System.IO
open Microsoft.AspNetCore.Hosting
open <%= namespace %>

[<EntryPoint>]
let main argv =

    let host =
            WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

    host.Run()

    0 // return an integer exit code

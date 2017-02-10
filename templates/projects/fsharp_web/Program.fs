open System;
open System.Collections.Generic;
open System.IO;
open System.Linq;
open System.Threading.Tasks;
open Microsoft.AspNetCore.Hosting;
open <%= namespace %>

[<EntryPoint>]
let main argv =

    let host =
            WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()<% if(includeApplicationInsights){ %>
                .UseApplicationInsights()<% } %>
                .Build();

    host.Run()

    0 // return an integer exit code

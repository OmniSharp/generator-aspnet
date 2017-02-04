namespace <%= namespace %>

open System;
open System.Collections.Generic;
open System.Linq;
open System.Threading.Tasks;
open Microsoft.AspNetCore.Builder;
open Microsoft.AspNetCore.Hosting;
open Microsoft.AspNetCore.Http;
open Microsoft.Extensions.DependencyInjection;
open Microsoft.Extensions.Logging;


type Startup() =

    // This method gets called by the runtime. Use this method to add services to the container.
    member this.ConfigureServices(services: IServiceCollection) = ()

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    member this.Configure(app: IApplicationBuilder, env: IHostingEnvironment, loggerFactory: ILoggerFactory) =
        loggerFactory.AddConsole() |> ignore
        if env.IsDevelopment() then
            app.UseDeveloperExceptionPage() |> ignore

        let myHandler (context:HttpContext) =
            async {
                do! context.Response.WriteAsync("Hello World from F#") |> Async.AwaitTask
            }
            |> Async.StartAsTask :> Task

        app.Run(RequestDelegate(myHandler))
